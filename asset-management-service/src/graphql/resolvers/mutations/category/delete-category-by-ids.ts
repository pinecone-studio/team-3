import { categories } from '../../../../db';
import { MutationResolvers, Response } from '../../../../types/generated';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';

export const deleteCategoryByIds: MutationResolvers['deleteCategoryByIds'] = async (_: unknown, { ids }, context) => {
	const DB = drizzle(context.env.DB);

	await Promise.all(ids.map((id) => DB.delete(categories).where(eq(categories.id, id))));

	return Response.Success;
};
