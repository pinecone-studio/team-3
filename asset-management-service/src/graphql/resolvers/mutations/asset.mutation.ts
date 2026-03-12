import { drizzle } from 'drizzle-orm/d1';
import { assets } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const assetMutations = {
	createAsset: async (_parent: any, { input }: any, context: any) => {
		const db = drizzle(context.env.DB);

		return await db
			.insert(assets)
			.values({
				id: crypto.randomUUID(),
				...input,
				// Override the string date with a proper Date object for Drizzle
				purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : null,
				status: input.status || 'AVAILABLE',
			})
			.returning()
			.get();
	},

	updateAsset: async (_parent: any, { id, input }: any, context: any) => {
		const db = drizzle(context.env.DB);

		// Filter out undefined and convert date string if it exists in the update
		const updateData: any = {
			...input,
			updatedAt: new Date(),
		};

		if (input.purchaseDate) {
			updateData.purchaseDate = new Date(input.purchaseDate);
		}

		return await db.update(assets).set(updateData).where(eq(assets.id, id)).returning().get();
	},

	deleteAsset: async (_parent: any, { id }: { id: string }, context: any) => {
		const db = drizzle(context.env.DB);

		// Soft delete logic: setting deletedAt to the current timestamp
		return await db
			.update(assets)
			.set({
				deletedAt: new Date(),
			})
			.where(eq(assets.id, id))
			.returning()
			.get();
	},
};
