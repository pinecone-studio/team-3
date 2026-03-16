import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../types/generated';
import { assets, categories } from '../../../db';

export const getAssetById: QueryResolvers['getAssetById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB, { schema: { assets, categories } });
	const result = await DB.query.assets.findFirst({
		where: (assets, { eq }) => eq(assets.id, id),
		with: {
			category: true,
		},
	});
	if (!result) return null;

	return {
		...result,
		category: result.category ?? undefined,
		purchaseDate: result.purchaseDate?.toISOString().split('T')[0],
		deletedAt: result.deletedAt?.toISOString(),
	};
};
