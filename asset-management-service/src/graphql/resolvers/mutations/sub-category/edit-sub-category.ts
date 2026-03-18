import { drizzle } from "drizzle-orm/d1";
import { Response } from "../../../../types/generated"

export const  editSubCategory = async (_:unknown,{input},context) =>{
    const DB = drizzle(context.env.DB);
    
    return Response.Success
}