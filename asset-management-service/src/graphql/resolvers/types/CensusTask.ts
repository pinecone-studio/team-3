import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { assets } from '../../../db';

export const CensusTask = {
	asset: async (parent: any, _: unknown, context: any) => {
		const DB = drizzle(context.env.DB);

		const results = await DB.select().from(assets).where(eq(assets.id, parent.assetId));
		const asset = results[0];

		if (!asset) return null;

		return {
			id: asset.id,
			assetTag: asset.assetTag,
			categoryId: asset.categoryId ?? undefined,
			serialNumber: asset.serialNumber ?? undefined,
			status: asset.status,
			purchaseDate: asset.purchaseDate ? asset.purchaseDate.toISOString() : undefined,
			purchaseCost: asset.purchaseCost ?? undefined,
			currentBookValue: asset.currentBookValue ?? undefined,
			locationId: asset.locationId ?? undefined,
			assignedTo: asset.assignedTo ?? undefined,
			deletedAt: asset.deletedAt ? asset.deletedAt.toISOString() : undefined,
		} as any;
	},
};
