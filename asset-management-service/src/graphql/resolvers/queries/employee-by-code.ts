import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers, EmployeeStatus } from '../../../types/generated';
import { employees } from '../../../db';

export const getEmployeeByCode: QueryResolvers['getEmployeeByCode'] = async (_, { employeeCode }, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(employees).where(eq(employees.employeeCode, employeeCode)).limit(1);
	const emp = result[0];

	if (!emp) {
		return null;
	}

	return {
		...emp,
		id: emp.id.toString(),
		status: (emp.status as EmployeeStatus) ?? EmployeeStatus.Active,
		hireDate: emp.hireDate ? new Date(emp.hireDate).toISOString() : '',
		terminationDate: emp.terminationDate ? new Date(emp.terminationDate).toISOString() : undefined,
		imageUrl: emp.imageUrl ?? undefined,
		github: emp.github ?? undefined,
		birthDayAndMonth: emp.birthDayAndMonth ?? undefined,
		birthdayPoster: emp.birthdayPoster ?? undefined,
	};
};
