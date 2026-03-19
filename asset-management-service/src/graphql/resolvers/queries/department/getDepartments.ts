import { createDB, department } from "../../../../db";
import { QueryResolvers } from "../../../../types/generated";

export const getDepartments: QueryResolvers['getDepartments'] = async (_: unknown, __: unknown, context) => {
    const DB = createDB(context.env)
    const departments = await DB.select().from(department)
    return departments
}