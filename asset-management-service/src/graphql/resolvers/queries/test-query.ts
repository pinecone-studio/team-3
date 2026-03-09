import { assets } from "../../../db"
import { createDB } from "../../../db/drizzle"

export const testQuery = async (_: unknown, __: unknown, { env }: Context) => {
    try{
        const db = createDB(env)

        console.log(assets)

        const data = await db.select().from(assets).run()
        
        return data
    }catch(error){ 
        throw new Error(JSON.stringify(error,null,2))
    }
   
}