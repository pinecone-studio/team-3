import { eq } from "drizzle-orm";
import { createDB, subCategory } from "../../../../db";
import { MutationResolvers, Response } from "../../../../types/generated";

export const deleteSubCategoryById:MutationResolvers['deleteSubCategoryById'] = async (_:unknown,{id},context)=>{
    const DB = createDB(context.env)

    await DB.delete(subCategory).where(eq(subCategory.id,id))

    return Response.Success
}