import { drizzle } from 'drizzle-orm/d1';
import { eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const updateCensusTask: MutationResolvers['updateCensusTask'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		// Normalize to YYYY-MM-DD at midnight
		const dateToStore = input.verifiedAt
			? new Date(new Date(input.verifiedAt).setHours(0, 0, 0, 0))
			: new Date(new Date().setHours(0, 0, 0, 0));

		await DB.update(censusTasks)
			.set({
				verifierId: input.verifierId ?? undefined,
				verifiedAt: dateToStore, // Drizzle converts this to integer for SQLite
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
