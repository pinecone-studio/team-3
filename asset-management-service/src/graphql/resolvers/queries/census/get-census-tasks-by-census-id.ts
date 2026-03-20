import { eq } from "drizzle-orm";
import { assets, censusTasks, createDB, employees } from "../../../../db";

export const getCensusTasksByCensusId = async (
  _: unknown,
  { censusId }:{censusId:string},
  context:Context
) => {
  const DB = createDB(context.env)

  const rows = await DB
    .select()
    .from(censusTasks)
    .leftJoin(assets, eq(censusTasks.assetId, assets.id))
    .leftJoin(employees, eq(censusTasks.verifierId, employees.id))
    .where(eq(censusTasks.censusId, censusId))

  return rows.map(({ census_tasks: task, assets: asset, employees: verifier }) => ({
    ...task,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    verifiedAt: task.verifiedAt ? task.verifiedAt.toISOString() : null,
    asset: asset ? {
      ...asset,
      purchaseDate: asset.purchaseDate ? asset.purchaseDate.toISOString() : null,
      deletedAt: asset.deletedAt ? asset.deletedAt.toISOString() : null,
    } : null,
    employees: verifier ? {
      ...verifier,
      clerkId: verifier.clerkId ?? '',
      hireDate: verifier.hireDate ? verifier.hireDate.toISOString() : '',
    } : null,
  }))
}