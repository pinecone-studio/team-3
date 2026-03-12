import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, QueryResolvers, Response } from '../../../types/generated';
import { assets } from '../../../db'; // Assuming your table name is assets

export const createAsset: MutationResolvers['createAsset'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.insert(assets).values({
			...input,
			id: crypto.randomUUID(),

			// Fix 1: The Enum Null check (The cause of your error)
			status: input.status ?? undefined,

			// Fix 2: The Date conversion (Similar to hireDate)
			purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : undefined,

			// Fix 3: Other optional fields that GraphQL might send as null
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
