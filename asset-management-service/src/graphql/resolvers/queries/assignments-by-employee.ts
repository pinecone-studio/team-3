import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';

export const getAssignmentsByEmployee: QueryResolvers['getAssignmentsByEmployee'] = async (_, { employeeId }, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(assignments).where(eq(assignments.employeeId, employeeId));
	return result.map((row) => ({
		...row,
		assignedAt: row.assignedAt.toISOString(),
		returnedAt: row.returnedAt?.toISOString(),
		accessoriesJson: row.accessoriesJson as string,
	}));
};
