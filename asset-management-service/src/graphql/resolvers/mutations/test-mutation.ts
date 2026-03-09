
import { nanoid } from "nanoid";
import { assets } from "../../../db";
import { createDB } from "../../../db/drizzle";
import { Response } from "../../../types/generated";

export const testMutation = async (_: unknown, __: unknown, { env }: Context) => {
    const DB = createDB(env)

    console.log(assets)

    await DB.insert(assets).values({ id: nanoid(), name: "teste", category: "testes" })

    return Response.Success
}