import { assets } from "../../../db"
import { createDB } from "../../../db/drizzle"

export const testQuery = async (_: unknown, __: unknown, { env }: Context) => {
    try {
        const db = createDB(env)

        const data = await db.select().from(assets)

        return data
    } catch (error) {
        throw new Error(JSON.stringify(error, null, 2))
    }

}