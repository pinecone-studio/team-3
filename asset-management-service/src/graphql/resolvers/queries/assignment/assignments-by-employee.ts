import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { assignments } from '../../../../db/schema/assignments.schema';
import { assets } from '../../../../db/schema/assets.schema'; // Import your assets table

export const getAssignmentsByEmployee: QueryResolvers['getAssignmentsByEmployee'] = async (_, { employeeId }, context) => {
	try {
		const DB = drizzle(context.env.DB);

		// Perform the Left Join from assignments to assets
		const result = await DB.select({
			assignment: assignments,
			asset: assets,
		})
			.from(assignments)
			.leftJoin(assets, eq(assignments.assetId, assets.id))
			.where(eq(assignments.employeeId, employeeId));

		return result.map(({ assignment, asset }) => ({
			...assignment,
			// Format dates for the assignment
			assignedAt: assignment.assignedAt.toISOString(),
			returnedAt: assignment.returnedAt?.toISOString(),
			accessoriesJson: assignment.accessoriesJson as string,

			// Map the joined asset data
			// If your GraphQL schema expects an 'asset' field inside the assignment:
			asset: asset
				? {
						...asset,
						purchaseDate: asset.purchaseDate?.toISOString().split('T')[0],
						deletedAt: asset.deletedAt?.toISOString(),
					}
				: null,
		}));
	} catch (error) {
		console.error('Join Error:', error);
		return [];
	}
};
