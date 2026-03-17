import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { assignments } from '../../../../db/schema/assignments.schema';

export const getAssignmentById: QueryResolvers['getAssignmentById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);
	const [row] = await DB.select().from(assignments).where(eq(assignments.id, id));
	if (!row) return null;

	return {
		...row,
		assignedAt: row.assignedAt.toISOString(),
		returnedAt: row.returnedAt?.toISOString(),
		accessoriesJson: row.accessoriesJson as string,
	};
};
