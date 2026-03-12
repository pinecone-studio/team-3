import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../types/generated';
import { assets } from '../../../db';
import { eq } from 'drizzle-orm';

export const updateAsset: MutationResolvers['updateAsset'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);
	await DB.update(assets)
		.set({ ...input, purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : null })
		.where(eq(assets.id, id));

	return Response.Success;
};
