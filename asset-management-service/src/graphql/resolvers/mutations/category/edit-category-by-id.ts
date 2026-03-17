import { categories } from "../../../db";
import { MutationResolvers, Response } from "../../../types/generated";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';

let dbInstance: ReturnType<typeof drizzle> | null = null;

const getDB = (d1: D1Database) => {
  if (!dbInstance) {
    dbInstance = drizzle(d1);
  }
  return dbInstance;
};

export const editCategoryById: MutationResolvers["editCategoryById"] = async (_, { input }, context) => {
  const DB = getDB(context.env.DB);

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