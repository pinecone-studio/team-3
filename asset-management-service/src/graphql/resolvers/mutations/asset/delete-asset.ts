import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assets } from '../../../../db';
import { eq } from 'drizzle-orm';

export const deleteAsset: MutationResolvers['deleteAsset'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);
	await DB.update(assets)
		.set({
			deletedAt: new Date(),
		})
		.where(eq(assets.id, id));

	return Response.Success;
};
