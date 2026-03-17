import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../../types/generated';
import { censusEvents } from '../../../../db';

export const getCensusEvents: QueryResolvers['getCensusEvents'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	const results = await DB.select().from(censusEvents);

	return results.map((event) => ({
		id: event.id,
		name: event.name,
		scope: event.scope ?? '',
		scopeFilter: event.scopeFilter ? String(event.scopeFilter) : undefined,
		startedAt: event.startedAt ? event.startedAt.toISOString() : '',
		closedAt: event.closedAt ? event.closedAt.toISOString() : undefined,
		createdBy: event.createdBy ?? '',
	}));
};
