
import { nanoid } from "nanoid";
import { assets } from "../../../db";
import { createDB } from "../../../db/drizzle";
import { MutationResolvers, Response } from "../../../types/generated";

export const testMutation: MutationResolvers["testMutation"] = async (_, __, { env }) => {
    const DB = createDB(env)

    try {
        await DB.insert(assets).values({
            id: "NylIPNudyjC8S-TFvn0ZN",
            name: "teste",
            category: "testes",
        });


        return Response.Success;
    } catch (error: any) {
        console.error("FULL ERROR:", error);
        console.error("ERROR MESSAGE:", error?.message);
        console.error("ERROR CAUSE:", error?.cause);
        console.error("CAUSE MESSAGE:", error?.cause?.message);
        console.error("STACK:", error?.stack);
        throw error;
    }
}