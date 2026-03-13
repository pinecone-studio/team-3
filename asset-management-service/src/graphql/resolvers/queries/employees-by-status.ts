import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm'; // We need 'eq' to compare values
import { QueryResolvers, EmployeeStatus } from '../../../types/generated';
import { employees } from '../../../db';

export const getEmployeesByStatus: QueryResolvers['getEmployeesByStatus'] = async (_, { status }, context) => {
	const DB = drizzle(context.env.DB);

	// Fetch only employees whose status matches the argument
	const result = await DB.select().from(employees).where(eq(employees.status, status));

	return result.map((emp) => {
		return {
			...emp,
			id: emp.id.toString(),
			// Cast the string from DB to your Enum type
			status: (emp.status as EmployeeStatus) ?? EmployeeStatus.Active,

			// Transform Timestamps to ISO Strings
			hireDate: emp.hireDate ? new Date(emp.hireDate).toISOString() : '',
			terminationDate: emp.terminationDate ? new Date(emp.terminationDate).toISOString() : undefined,

			// Clean up nulls to undefined for TypeScript
			imageUrl: emp.imageUrl ?? undefined,
			github: emp.github ?? undefined,
			birthDayAndMonth: emp.birthDayAndMonth ?? undefined,
			birthdayPoster: emp.birthdayPoster ?? undefined,
		};
	});
};
