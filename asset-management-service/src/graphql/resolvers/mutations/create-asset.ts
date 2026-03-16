import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, QueryResolvers, Response } from '../../../types/generated';
import { assets } from '../../../db';

export const createAsset: MutationResolvers['createAsset'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);
	try {
		await DB.insert(assets).values({
			...input,
			id: crypto.randomUUID(),
			status: input.status ?? undefined,
			purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : undefined,
			locationId: input.locationId ?? undefined,
			purchaseCost: input.purchaseCost ?? undefined,
			serialNumber: input.serialNumber ?? undefined,
		});

		return Response.Success;
	} catch (error) {
		console.error('Asset Insert failed:', error);
		return Response.Failed;
	}
};
