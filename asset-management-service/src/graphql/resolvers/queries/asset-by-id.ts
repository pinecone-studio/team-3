import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../types/generated';
import { assets, categories } from '../../../db';
import { eq } from 'drizzle-orm';

export const getAssetById: QueryResolvers['getAssetById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB, { schema: { assets, categories } }); // Pass the schema here!

	// Use Relational Query 'findFirst' instead of 'select'
	const result = await DB.query.assets.findFirst({
		where: (assets, { eq }) => eq(assets.id, id),
		with: {
			category: true, // This "fills" the category field
		},
	});

	if (!result) return null;

	return {
		...result,
		// Drizzle now provides 'result.category' as an object
		category: result.category ?? undefined,

		// Handling your Date conversions as before
		purchaseDate: result.purchaseDate?.toISOString().split('T')[0],
		deletedAt: result.deletedAt?.toISOString(),

		// For the other fields, result.fieldName will work fine
	};
};
