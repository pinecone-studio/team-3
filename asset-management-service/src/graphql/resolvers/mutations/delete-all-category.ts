import { categories } from "../../../db";
import { MutationResolvers, Response } from "../../../types/generated";
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';

export const deleteAllCategory: MutationResolvers['deleteAllCategory'] = async (
    _: unknown,
    { ids },
    context
) => {
    const DB = drizzle(context.env.DB);

    for (const id of ids) {
            await DB.delete(categories).where(eq(categories.id, id));
    }

    return Response.Success
};