import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../types/generated';
import { censusEvents } from '../../../db';

export const getCensusEventById: QueryResolvers['getCensusEventById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	const results = await DB.select()
		.from(censusEvents)
		.where(eq(censusEvents.id, id));

	const event = results[0];

	if (!event) {
		throw new Error('Census event not found');
	}

	return {
		...event,
		name: event.name,
		scope: event.scope ?? '',
		scopeFilter: event.scopeFilter ? String(event.scopeFilter) : undefined,
		startedAt: event.startedAt ? event.startedAt.toISOString() : undefined,
		closedAt: event.closedAt ? event.closedAt.toISOString() : undefined,
		createdBy: event.createdBy ?? '',
	};
};