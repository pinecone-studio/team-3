import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm'; // Import the "equal" operator
import { QueryResolvers, EmployeeStatus, Employee } from '../../../types/generated';
import { employees } from '../../../db';

export const getEmployeeById: QueryResolvers['getEmployeeById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(employees).where(eq(employees.id, id)).limit(1);
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
	};
};
