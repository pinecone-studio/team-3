import { QueryResolvers } from '../../../types/generated';
import { assets, categories } from '../../../db';
import { drizzle } from 'drizzle-orm/d1';

export const getAssets: QueryResolvers['getAssets'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB, { schema: { assets, categories } });
	const results = await DB.query.assets.findMany({
		where: (assets, { isNull }) => isNull(assets.deletedAt),
		with: {
			category: true,
		},
	});

	return results.map((asset) => ({
		...asset,
		category: asset.category ?? undefined,
		purchaseDate: asset.purchaseDate ? asset.purchaseDate.toISOString().split('T')[0] : undefined,
		deletedAt: asset.deletedAt ? asset.deletedAt.toISOString() : undefined,
		assignedTo: asset.assignedTo ?? undefined,
		serialNumber: asset.serialNumber ?? undefined,
		locationId: asset.locationId ?? undefined,
		purchaseCost: asset.purchaseCost ?? undefined,
		currentBookValue: asset.currentBookValue ?? undefined,
	}));
};
