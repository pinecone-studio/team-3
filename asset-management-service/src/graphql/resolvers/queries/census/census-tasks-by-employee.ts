import { drizzle } from 'drizzle-orm/d1';
import { and, eq, isNull } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { censusTasks, assets } from '../../../../db'; // 1. Import assets table

export const censusTasksByEmployee = async (_: unknown, { employeeId }: { employeeId: string }, context: any) => {
	const DB = drizzle(context.env.DB);

	try {
		const results = await DB.select()
			.from(censusTasks)
			.leftJoin(assets, eq(censusTasks.assetId, assets.id))
			.where(and(eq(censusTasks.verifierId, employeeId), isNull(censusTasks.verifiedAt)));

		// Map directly and return
		return results.map((row) => ({
			...row.census_tasks,
			id: String(row.census_tasks.id),
			// Ensure these match your GraphQL schema expectations
			verifiedAt: row.census_tasks.verifiedAt?.toISOString() ?? null,
			createdAt: row.census_tasks.createdAt.toISOString(),
			updatedAt: row.census_tasks.updatedAt.toISOString(),
			verifier: null,
			asset: row.assets
				? {
						...row.assets,
						id: String(row.assets.id), // Ensure asset ID is also a string if needed
					}
				: null,
		}));
	} catch (error) {
		console.error('Error fetching census tasks:', error);
		throw new Error('Failed to fetch pending census tasks.');
	}
};
