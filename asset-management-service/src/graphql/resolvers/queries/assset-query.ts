import { drizzle } from 'drizzle-orm/d1';
import { assets } from '../../../db/schema';
import { eq, isNull } from 'drizzle-orm';

export const assetQueries = {
	assets: async (_parent: any, _args: any, context: any) => {
		const db = drizzle(context.env.DB);
		return await db.select().from(assets).where(isNull(assets.deletedAt));
	},

	asset: async (_parent: any, { id }: { id: string }, context: any) => {
		const db = drizzle(context.env.DB);
		return await db.select().from(assets).where(eq(assets.id, id)).get();
	},
};
