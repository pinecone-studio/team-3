import { drizzle } from 'drizzle-orm/d1';
import { Asset, AssetStatusEnum, MutationResolvers, Response } from '../../../types/generated';
import { nanoid } from 'nanoid';
import { assets } from '../../../db';

export const createAsset: MutationResolvers['createAsset'] = async (_, { input }, context) => {
	console.log('asdkasdkjklasjdkl');
	const DB = drizzle(context.env.DB);
	// const finalInput = {
	// 	id: nanoid(),
	// 	...input,
	// 	purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : null,
	// 	status: input.status || AssetStatusEnum.Available,
	// };

	await DB.insert(assets)
		.values({
			id: nanoid(),
			...input,
			// assetTag: input.assetTag,
			// category: input.category,
			// locationId: input.locationId,
			// purchaseCost: input.purchaseCost,
			// serialNumber: input.serialNumber,
			purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : null,
			status: input.status,
		})
		.returning()
		.get();

	return Response.Success;
};
