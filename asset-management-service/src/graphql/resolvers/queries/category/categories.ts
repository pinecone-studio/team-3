import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { categories, assets } from '../../../../db';

export const getCategories: QueryResolvers['getCategories'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	// 1. Fetch flat rows using a Join
	const rows = await DB.select({
		category: categories,
		asset: assets,
	})
		.from(categories)
		.leftJoin(assets, eq(categories.id, assets.categoryId))
		.all();

	// 2. Group the assets by category
	const categoryMap = new Map<string, any>();

	for (const row of rows) {
		const catId = row.category.id;

		if (!categoryMap.has(catId)) {
			categoryMap.set(catId, {
				...row.category,
				assets: [],
			});
		}

		if (row.asset) {
			categoryMap.get(catId).assets.push(row.asset);
		}
	}

	return Array.from(categoryMap.values());
};
