import { drizzle } from 'drizzle-orm/d1';
import { and, eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { censusTasks } from '../../../db';

export const finalizeCensusEvent: MutationResolvers['finalizeCensusEvent'] = async (
	_,
	{ censusId },
	context
) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.update(censusTasks)
			.set({
				discrepancyFlag: true,
			})
			.where(
				and(
					eq(censusTasks.censusId, censusId),
					isNull(censusTasks.verifiedAt)
				)
			);

		return Response.Success;
	} catch (error) {
		console.error('Finalize Census Event failed:', error);
		return Response.Failed;
	}
};