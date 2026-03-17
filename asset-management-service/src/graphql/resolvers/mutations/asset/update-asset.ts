import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assets } from '../../../../db';
import { eq } from 'drizzle-orm';

export const updateAsset: MutationResolvers['updateAsset'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const cleanInput = Object.fromEntries(Object.entries(input).filter(([_, value]) => value !== null)) as any;
		if (input.purchaseDate) {
			cleanInput.purchaseDate = new Date(input.purchaseDate);
		}
		await DB.update(assets).set(cleanInput).where(eq(assets.id, id));
		return Response.Success;
	} catch (error) {
		console.error('Update Asset Error:', error);
		return Response.Failed;
	}
};
