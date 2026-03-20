import { and, eq, isNull } from "drizzle-orm";
import { assets, assignments, censusTasks, createDB } from "../../../../db";
import { QueryResolvers, Response } from "../../../../types/generated";
import { count } from "drizzle-orm";

export const getEmployeeInfById: QueryResolvers['getEmployeeInfById'] = async (_: unknown, { id }, context) => {
    const DB = createDB(context.env)
    const result1 = await DB
        .select({ count: count() })
        .from(assets)
        .where(eq(assets.assignedTo, id));

    const totalAssetCount = result1[0]?.count ?? 0;

    const result2 = await DB
        .select()
        .from(censusTasks)
        .where(
            and(
                eq(censusTasks.verifierId, id),
                isNull(censusTasks.verifiedAt)
            )
        );

    const totalCensusTask = result2.length;

    const result3 = await DB.select().from(assignments).where(and(eq(assignments.employeeId, id), isNull(assignments.signatureR2Key)))
    const totalAssigmentCount = result3.length
    return { totalAssetCount, totalCensusTask, totalAssigmentCount }
}