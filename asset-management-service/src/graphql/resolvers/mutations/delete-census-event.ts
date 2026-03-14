import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { censusEvents } from '../../../db';

export const deleteCensusEvent: MutationResolvers['deleteCensusEvent'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.delete(censusEvents).where(eq(censusEvents.id, id));

		return Response.Success;
	} catch (error) {
		console.error('Delete Census Event failed:', error);
		return Response.Failed;
	}
};
