import { createDB, subCategory } from "../../../../db";
import { categories } from "../../../../db/schema/categories.schema";
import { eq } from "drizzle-orm";
import { QueryResolvers } from "../../../../types/generated";

export const getSubCategoriesWithCategory: QueryResolvers['getSubCategoriesWithCategory'] = async (_, __, context) => {
    const DB = createDB(context.env)
    const subCategories = await DB
        .select()
        .from(subCategory)
        .leftJoin(categories, eq(subCategory.categoryId, categories.id))
    return subCategories
}