import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../types/generated';
import { categories, assets } from '../../../db';

export const getCategories: QueryResolvers['getCategories'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB, { schema: { categories, assets } });
	const results = await DB.query.categories.findMany({
		with: {
			assets: true,
		},
	});
	return results.map((category) => ({
		...category,
		assets: category.assets ?? [],
	}));
};
