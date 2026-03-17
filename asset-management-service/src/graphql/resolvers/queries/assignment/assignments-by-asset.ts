import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { assignments } from '../../../../db/schema/assignments.schema';

export const getAssignmentsByAsset: QueryResolvers['getAssignmentsByAsset'] = async (_, { assetId }, context) => {
	const DB = drizzle(context.env.DB);
	const result = await DB.select().from(assignments).where(eq(assignments.assetId, assetId));
	return result.map((row) => ({
		...row,
		assignedAt: row.assignedAt.toISOString(),
		returnedAt: row.returnedAt?.toISOString(),
		accessoriesJson: row.accessoriesJson as string,
	}));
};
