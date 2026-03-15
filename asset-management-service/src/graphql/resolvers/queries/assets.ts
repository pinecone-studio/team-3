import { QueryResolvers } from '../../../types/generated';
import { assets, categories } from '../../../db';
import { drizzle } from 'drizzle-orm/d1';

export const getAssets: QueryResolvers['getAssets'] = async (_, __, context) => {
	// 1. Initialize with schema to unlock DB.query
	const DB = drizzle(context.env.DB, { schema: { assets, categories } });

	// 2. Use findMany with the 'with' property
	const results = await DB.query.assets.findMany({
		where: (assets, { isNull }) => isNull(assets.deletedAt),
		with: {
			category: true, // This joins the category table for every asset
		},
	});

	// 3. Map the results
	return results.map((asset) => ({
		...asset,
		// result.category is now an object { id, name, picture }
		category: asset.category ?? undefined,

		purchaseDate: asset.purchaseDate ? asset.purchaseDate.toISOString().split('T')[0] : undefined,
		deletedAt: asset.deletedAt ? asset.deletedAt.toISOString() : undefined,

		// Drizzle's findMany handles the null-to-undefined mapping for
		// optional fields automatically if your types match,
		// but keeping your explicit mapping is safer for GraphQL.
		assignedTo: asset.assignedTo ?? undefined,
		serialNumber: asset.serialNumber ?? undefined,
		locationId: asset.locationId ?? undefined,
		purchaseCost: asset.purchaseCost ?? undefined,
		currentBookValue: asset.currentBookValue ?? undefined,
	}));
};
