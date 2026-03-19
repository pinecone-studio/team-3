import { eq } from "drizzle-orm"
import { createDB, subCategory } from "../../../../db"
import { MutationResolvers, Response } from "../../../../types/generated"

export const editSubCategoryById: MutationResolvers['editSubCategoryById'] = async (_: unknown, { input }, context) => {
    const DB = createDB(context.env)
    await DB.update(subCategory).set({ name: input.name }).where(eq(subCategory.id, input.id))
    return Response.Success
}