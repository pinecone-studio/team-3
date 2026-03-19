import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm'; // Need this for the join condition
import { assets, categories } from '../../../../db';
import { QueryResolvers } from '../../../../types/generated';

export const getAssetsByEmployeeId: QueryResolvers['getAssetsByEmployeeId'] = async (_, { employeeId }, context) => {
	try {
		if (!context.env?.DB) {
			throw new Error("D1 Database binding 'DB' not found");
		}

		const DB = drizzle(context.env.DB);

		// Perform the explicit Left Join
		const rows = await DB.select({
			asset: assets,
			category: categories,
		})
			.from(assets)
			.leftJoin(categories, eq(assets.categoryId, categories.id))
			.where(eq(assets.assignedTo, employeeId));

		// Rows will be an array of { asset: ..., category: ... }
		return rows.map(({ asset, category }) => ({
			...asset,
			// Attach the joined category
			category: category ?? undefined,
			// Format dates safely
			purchaseDate:
				asset.purchaseDate instanceof Date ? asset.purchaseDate.toISOString().split('T')[0] : (asset.purchaseDate as unknown as string),
			deletedAt: asset.deletedAt instanceof Date ? asset.deletedAt.toISOString() : (asset.deletedAt as unknown as string),
		}));
	} catch (error) {
		console.error('RESOLVER ERROR:', error);
		return [];
	}
};
