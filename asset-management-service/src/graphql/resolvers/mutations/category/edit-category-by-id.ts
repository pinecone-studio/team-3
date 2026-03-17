

import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { categories } from '../../../../db';


export const editCategoryById: MutationResolvers["editCategoryById"] = async (_, { input }, context) => {
  const DB = drizzle(context.env.DB);

  const { id, name, description } = input;

  const updateData: Partial<{ name: string; description: string }> = {};

  if (name != null) updateData.name = name;
  if (description != null) updateData.description = description;

  if (Object.keys(updateData).length === 0) return Response.Success;

  await DB.update(categories)
    .set(updateData)
    .where(eq(categories.id, id));

  return Response.Success;
};