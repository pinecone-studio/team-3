import { nanoid } from "nanoid";
import { subCategory } from "../../../../db";
import { MutationResolvers, Response } from "../../../../types/generated";
import { drizzle } from 'drizzle-orm/d1';

export const createSubCategory:MutationResolvers['createSubCategory'] = async (_:unknown,{input},context)=>{
    const DB = drizzle(context.env.DB);


    await DB.insert(subCategory).values({id:nanoid(),name:input.name,categoryId:input.categoryId})

    return Response.Success
}