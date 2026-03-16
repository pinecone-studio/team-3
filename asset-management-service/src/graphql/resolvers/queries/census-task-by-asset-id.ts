import { drizzle } from 'drizzle-orm/d1';
import { and, eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../types/generated';
import { censusTasks } from '../../../db';

export const getCensusTaskByAssetId: QueryResolvers['getCensusTaskByAssetId'] = async (_, { censusId, assetId }, context) => {
	const DB = drizzle(context.env.DB);

	const results = await DB.select()
		.from(censusTasks)
		.where(and(eq(censusTasks.censusId, censusId), eq(censusTasks.assetId, assetId)));

	const task = results[0];

	if (!task) return null;

	return {
		id: task.id,
		censusId: task.censusId,
		assetId: task.assetId,
		verifierId: task.verifierId ?? undefined,
		verifiedAt: task.verifiedAt ? task.verifiedAt.toISOString() : undefined,
		conditionReported: task.conditionReported ?? undefined,
		locationConfirmed: task.locationConfirmed ?? undefined,
		discrepancyFlag: task.discrepancyFlag ?? undefined,
	};
};
