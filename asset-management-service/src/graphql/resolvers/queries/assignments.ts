import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../types/generated';
import { assignments } from '../../../db/schema/assignments.schema';

export const getAssignments: QueryResolvers['getAssignments'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(assignments);
	return result.map((row) => ({
		...row,
		assignedAt: row.assignedAt.toISOString(),
		returnedAt: row.returnedAt?.toISOString(),
		accessoriesJson: row.accessoriesJson as string,
	}));
};
