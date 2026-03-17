import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../types/generated';
import { categories } from '../../../db';

export const createCategory: MutationResolvers['createCategory'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);
	const newCategory = {
		id: crypto.randomUUID(),
		name: input.name,
		description:input.description 
	};
	await DB.insert(categories).values(newCategory).returning();
	return Response.Success;
};
