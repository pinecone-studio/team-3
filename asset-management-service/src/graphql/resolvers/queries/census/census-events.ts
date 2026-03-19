import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { censusEvents, employees } from '../../../../db';

export const getCensusEvents: QueryResolvers['getCensusEvents'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	// Perform the left join to get employee details
	const results = await DB.select({
		event: censusEvents,
		creator: {
			firstName: employees.firstName,
			lastName: employees.lastName,
		},
	})
		.from(censusEvents)
		.leftJoin(employees, eq(censusEvents.createdBy, employees.id));

	return results.map(({ event, creator }) => {
		// Format the name as "Firstname LastnameInitial." (e.g., Бат-Эрдэнэ А.)
		// Or simply return the Full Name depending on your UI preference
		const creatorName = creator?.firstName
			? `${creator.firstName}${creator.lastName ? ` ${creator.lastName.charAt(0)}.` : ''}`
			: (event.createdBy ?? '');

		return {
			id: event.id,
			name: event.name,
			scope: event.scope ?? '',
			scopeFilter: event.scopeFilter ? String(event.scopeFilter) : undefined,
			startedAt: event.startedAt ? event.startedAt.toISOString() : '',
			closedAt: event.closedAt ? event.closedAt.toISOString() : undefined,
			// Now returning the formatted name for the UI "Үүсгэсэн" field
			createdBy: creatorName,
		};
	});
};
