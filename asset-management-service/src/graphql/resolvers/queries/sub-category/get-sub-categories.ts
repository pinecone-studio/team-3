import { createDB, subCategory } from "../../../../db";
import { QueryResolvers } from "../../../../types/generated";

export const getSubCategories: QueryResolvers['getSubCategories'] = async (_, __, context) => {
    const DB = createDB(context.env)
    const subCategories = await DB
        .select()
        .from(subCategory)
    return subCategories
}