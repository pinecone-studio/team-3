import { QueryResolvers } from '../../../types/generated';
import { assets } from '../../../db';
import { isNull } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

export const getAssets: QueryResolvers['getAssets'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	const results = await DB.select().from(assets).where(isNull(assets.deletedAt));

	return results.map((asset) => ({
		...asset,
		purchaseDate: asset.purchaseDate ? asset.purchaseDate.toISOString().split('T')[0] : undefined,
		deletedAt: asset.deletedAt ? asset.deletedAt.toISOString() : undefined,
		assignedTo: asset.assignedTo ?? undefined,
		serialNumber: asset.serialNumber ?? undefined,
		locationId: asset.locationId ?? undefined,
		purchaseCost: asset.purchaseCost ?? undefined,
		currentBookValue: asset.currentBookValue ?? undefined,
	}));
};
