import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { categories } from '../../../db';

export const Asset = {
	category: async (parent: any, _: unknown, context: any) => {
		if (!parent.categoryId) return null;

		const DB = drizzle(context.env.DB);

		const results = await DB.select().from(categories).where(eq(categories.id, parent.categoryId));
		const category = results[0];

		if (!category) return null;

		return {
			id: category.id,
			name: category.name,
			description: category.description ?? undefined,
		};
	},
};
