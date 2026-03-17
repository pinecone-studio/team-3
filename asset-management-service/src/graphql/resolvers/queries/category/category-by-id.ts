import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../../types/generated';
import { categories, assets } from '../../../../db';

export const getCategoryById: QueryResolvers['getCategoryById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB, { schema: { categories, assets } });
	const result = await DB.query.categories.findFirst({
		where: (categories, { eq }) => eq(categories.id, id),
		with: {
			assets: true,
		},
	});
	if (!result) {
		return null;
	}
	return {
		...result,
		assets: result.assets ?? [],
	};
};
