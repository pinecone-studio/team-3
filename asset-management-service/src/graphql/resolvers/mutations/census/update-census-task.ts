import { drizzle } from 'drizzle-orm/d1';
import { eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const updateCensusTask: MutationResolvers['updateCensusTask'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.update(censusTasks)
			.set({
				verifierId: input.verifierId ?? undefined,
				verifiedAt: input.verifiedAt ? new Date(input.verifiedAt) : new Date(),
				conditionReported: input.conditionReported ?? undefined,
				locationConfirmed: input.locationConfirmed ?? undefined,
				discrepancyFlag: input.discrepancyFlag ?? undefined,
			})
			.where(eq(censusTasks.id, input.id));

		return Response.Success;
	} catch (error) {
		console.error('Update Census Task failed:', error);
		return Response.Failed;
	}
};
