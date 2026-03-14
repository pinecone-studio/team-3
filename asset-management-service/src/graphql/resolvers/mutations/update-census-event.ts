import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { censusEvents } from '../../../db';

export const updateCensusEvent: MutationResolvers['updateCensusEvent'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const updateData: Record<string, unknown> = {};

		if (input.name !== undefined) {
			updateData.name = input.name;
		}

		if (input.scope !== undefined) {
			updateData.scope = input.scope;
		}

		if (input.scopeFilter !== undefined) {
			updateData.scopeFilter = input.scopeFilter ?? null;
		}

		if (input.startedAt !== undefined) {
			updateData.startedAt = input.startedAt ? new Date(input.startedAt) : null;
		}

		if (input.closedAt !== undefined) {
			updateData.closedAt = input.closedAt ? new Date(input.closedAt) : null;
		}

		if (input.createdBy !== undefined) {
			updateData.createdBy = input.createdBy;
		}

		await DB.update(censusEvents).set(updateData).where(eq(censusEvents.id, input.id));

		return Response.Success;
	} catch (error) {
		console.error('Update Census Event failed:', error);
		return Response.Failed;
	}
};
