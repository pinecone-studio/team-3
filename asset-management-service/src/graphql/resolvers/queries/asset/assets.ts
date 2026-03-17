import { isNull, eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { assets, categories } from '../../../../db';
import { drizzle } from 'drizzle-orm/d1';

export const getAssets: QueryResolvers['getAssets'] = async (_, __, context) => {
	// We don't need to pass the 'schema' object when using standard joins
	const DB = drizzle(context.env.DB);

	// Standard Select with Left Join
	const results = await DB.select({
		asset: assets,
		category: categories,
	})
		.from(assets)
		.leftJoin(categories, eq(assets.categoryId, categories.id))
		.where(isNull(assets.deletedAt))
		.all();

	// Map the flat rows back to your GraphQL structure
	return results.map(({ asset, category }) => ({
		...asset,
		category: category ?? undefined,
		purchaseDate: asset.purchaseDate ? asset.purchaseDate.toISOString().split('T')[0] : undefined,
		deletedAt: asset.deletedAt ? asset.deletedAt.toISOString() : undefined,
		assignedTo: asset.assignedTo ?? undefined,
		serialNumber: asset.serialNumber ?? undefined,
		locationId: asset.locationId ?? undefined,
		purchaseCost: asset.purchaseCost ?? undefined,
		currentBookValue: asset.currentBookValue ?? undefined,
	}));
};
