import { drizzle } from 'drizzle-orm/d1';
import { EmployeeStatus, QueryResolvers } from '../../../types/generated';
import { employees } from '../../../db';

export const getEmployees: QueryResolvers['getEmployees'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(employees);

	return result.map((emp) => {
		return {
			...emp,
			id: emp.id.toString(),
			status: (emp.status as EmployeeStatus) ?? EmployeeStatus.Active,
			hireDate: emp.hireDate ? new Date(emp.hireDate).toISOString() : '',
			terminationDate: emp.terminationDate ? new Date(emp.terminationDate).toISOString() : undefined,
			imageUrl: emp.imageUrl ?? undefined,
			birthDayAndMonth: emp.birthDayAndMonth ?? undefined,
			birthdayPoster: emp.birthdayPoster ?? undefined,
			github: emp.github ?? undefined,
		};
	});
};
