import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers, EmployeeStatus } from '../../../../types/generated';
import { employees } from '../../../../db';

export const getEmployeesByStatus: QueryResolvers['getEmployeesByStatus'] = async (_, { status }, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(employees).where(eq(employees.status, status));

	return result.map((emp) => {
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
			clerkId: emp.clerkId ?? '',
			role: emp.role ?? 'Employee',
			isAdmin: emp.isAdmin ?? false,
			isSalaryCompany: emp.isSalaryCompany ?? true,
			isKpi: emp.isKpi ?? false,
		};
	});
};
