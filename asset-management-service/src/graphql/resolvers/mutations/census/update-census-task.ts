import { drizzle } from 'drizzle-orm/d1';
import { eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const updateCensusTask: MutationResolvers['updateCensusTask'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		// Normalize to YYYY-MM-DD at midnight
		const dateToStore = input.verifiedAt ? new Date(input.verifiedAt) : new Date();

		await DB.update(censusTasks)
			.set({
				verifierId: input.verifierId ?? null,
				verifiedAt: dateToStore, // Drizzle converts this to integer for SQLite
				conditionReported: input.conditionReported ?? null,
				locationConfirmed: input.locationConfirmed ?? null,
				discrepancyFlag: input.discrepancyFlag ?? null,
			})
			.where(eq(censusTasks.id, input.id));

		return Response.Success;
	} catch (error) {
		console.error('Update Census Task failed:', error);
		return Response.Failed;
	}
};
