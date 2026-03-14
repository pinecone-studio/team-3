import { drizzle } from 'drizzle-orm/d1';
import { eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { censusEvents, censusTasks, assets } from '../../../db';
import { assignments } from '../../../db/schema/assigments.schema';

export const createCensusEvent: MutationResolvers['createCensusEvent'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const censusId = crypto.randomUUID();

		await DB.insert(censusEvents).values({
			id: censusId,
			name: input.name,
			scope: input.scope ?? undefined,
			scopeFilter: input.scopeFilter ?? undefined,
			startedAt: input.startedAt ? new Date(input.startedAt) : new Date(),
			closedAt: input.closedAt ? new Date(input.closedAt) : undefined,
			createdBy: input.createdBy ?? undefined,
		});

		const assignedAssets = await DB.select({
			assetId: assets.id,
			category: assets.category,
		})
			.from(assignments)
			.innerJoin(assets, eq(assignments.assetId, assets.id))
			.where(isNull(assets.deletedAt));

		let filteredAssets = assignedAssets;

		if (input.scope === 'category' && input.scopeFilter) {
			filteredAssets = assignedAssets.filter((item) => item.category === input.scopeFilter);
		}

		if (filteredAssets.length > 0) {
			await DB.insert(censusTasks).values(
				filteredAssets.map((item) => ({
					id: crypto.randomUUID(),
					censusId,
					assetId: item.assetId,
					verifierId: undefined,
					verifiedAt: undefined,
					conditionReported: undefined,
					locationConfirmed: false,
					discrepancyFlag: false,
				})),
			);
		}

		return Response.Success;
	} catch (error) {
		console.error('Create Census Event failed:', error);
		return Response.Failed;
	}
};
