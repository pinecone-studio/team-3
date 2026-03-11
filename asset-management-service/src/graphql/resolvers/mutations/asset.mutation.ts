import { drizzle } from 'drizzle-orm/d1';
import { assets } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const assetMutations = {
	createAsset: async (_parent: any, { input }: any, context: any) => {
		const db = drizzle(context.env.DB);
		const id = crypto.randomUUID();

		return await db
			.insert(assets)
			.values({
				id,
				...input,
				status: input.status || 'AVAILABLE',
			})
			.returning()
			.get();
	},

	updateAsset: async (_parent: any, { id, input }: any, context: any) => {
		const db = drizzle(context.env.DB);

		return await db
			.update(assets)
			.set({
				...input,
				updatedAt: new Date(),
			})
			.where(eq(assets.id, id))
			.returning()
			.get();
	},

	deleteAsset: async (_parent: any, { id }: { id: string }, context: any) => {
		const db = drizzle(context.env.DB);

		// Soft delete logic
		return await db.update(assets).set({ deletedAt: new Date() }).where(eq(assets.id, id)).returning().get();
	},
};
