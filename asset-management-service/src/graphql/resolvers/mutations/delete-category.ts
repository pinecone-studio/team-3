import { MutationResolvers, Response } from '../../../types/generated';
import { categories } from '../../../db';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

export const deleteCategory: MutationResolvers['deleteCategory'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.delete(categories).where(eq(categories.id, id));

		return Response.Success;
	} catch (error: any) {
		if (error.message.includes('FOREIGN KEY constraint failed')) {
			throw new Error('Cannot delete category: It still contains assets. Move or delete the assets first.');
		}
		throw error;
	}
};
