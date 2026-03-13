import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../types/generated';
import { assets } from '../../../db';
import { eq } from 'drizzle-orm';

export const getAssetById: QueryResolvers['getAssetById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	// 1. Fetch from DB
	const result = await DB.select().from(assets).where(eq(assets.id, id)).get();

	// 2. If no result, return null.
	// If TS errors here, your 'npm run generate' hasn't picked up the schema change yet!
	if (!result) {
		return null;
	}

	// 3. Map everything to satisfy the 'Asset' type exactly
	return {
		id: result.id,
		assetTag: result.assetTag,
		category: result.category,
		status: result.status,
		// Convert Date to String
		purchaseDate: result.purchaseDate ? result.purchaseDate.toISOString().split('T')[0] : undefined,
		// Convert Date to String
		deletedAt: result.deletedAt ? result.deletedAt.toISOString() : undefined,
		// Convert DB nulls to undefined
		serialNumber: result.serialNumber ?? undefined,
		purchaseCost: result.purchaseCost ?? undefined,
		currentBookValue: result.currentBookValue ?? undefined,
		locationId: result.locationId ?? undefined,
		assignedTo: result.assignedTo ?? undefined,
	};
};
