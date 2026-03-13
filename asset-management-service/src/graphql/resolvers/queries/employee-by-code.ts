import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers, EmployeeStatus } from '../../../types/generated';
import { employees } from '../../../db';

export const getEmployeeByCode: QueryResolvers['getEmployeeByCode'] = async (_, { employeeCode }, context) => {
	const DB = drizzle(context.env.DB);

	// Use the employeeCode argument to filter
	const result = await DB.select().from(employees).where(eq(employees.employeeCode, employeeCode)).limit(1);

	const emp = result[0];

	// If no employee is found with that code, return null
	if (!emp) {
		return null;
	}

	// Return the mapped object
	return {
		...emp,
		id: emp.id.toString(),
		status: (emp.status as EmployeeStatus) ?? EmployeeStatus.Active,

		// Date conversions
		hireDate: emp.hireDate ? new Date(emp.hireDate).toISOString() : '',
		terminationDate: emp.terminationDate ? new Date(emp.terminationDate).toISOString() : undefined,

		// Optional field clean-up (null -> undefined)
		imageUrl: emp.imageUrl ?? undefined,
		github: emp.github ?? undefined,
		birthDayAndMonth: emp.birthDayAndMonth ?? undefined,
		birthdayPoster: emp.birthdayPoster ?? undefined,
		// numberOfVacationDays: emp.numberOfVacationDays ?? undefined,
	};
};
