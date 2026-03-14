import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../types/generated';
import { censusTasks } from '../../../db';

export const createCensusTask: MutationResolvers['createCensusTask'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.insert(censusTasks).values({
			id: crypto.randomUUID(),
			censusId: input.censusId,
			assetId: input.assetId,
			verifierId: input.verifierId ?? undefined,
			verifiedAt: input.verifiedAt ? new Date(input.verifiedAt) : undefined,
			conditionReported: input.conditionReported ?? undefined,
			locationConfirmed: input.locationConfirmed ?? false,
			discrepancyFlag: input.discrepancyFlag ?? false,
		});

		return Response.Success;
	} catch (error) {
		console.error('Create Census Task failed:', error);
		return Response.Failed;
	}
};