import { isNull, eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { assets, categories, subCategory } from '../../../../db';
import { drizzle } from 'drizzle-orm/d1';

export const getAssets: QueryResolvers['getAssets'] = async (_, __, context) => {

	const DB = drizzle(context.env.DB);

	// Standard Select with Left Join
	const results = await DB.select({
		asset: assets,
		category: categories,
		subCategory: subCategory
	})
		.from(assets)
		.leftJoin(categories, eq(assets.categoryId, categories.id))
		.leftJoin(subCategory, eq(assets.subCategoryId, subCategory.id))
		.where(isNull(assets.deletedAt))
		.all();


	return results.map(({ asset, category, subCategory }) => ({
		...asset,
		category: category ?? undefined,
		subCategory: subCategory ?? undefined, 
		purchaseDate: asset.purchaseDate
			? asset.purchaseDate.toISOString().split('T')[0]
			: undefined,
		deletedAt: asset.deletedAt
			? asset.deletedAt.toISOString()
			: undefined,
		assignedTo: asset.assignedTo ?? undefined,
		serialNumber: asset.serialNumber ?? undefined,
		locationId: asset.locationId ?? undefined,
		purchaseCost: asset.purchaseCost ?? undefined,
		currentBookValue: asset.currentBookValue ?? undefined,
	}));
};
