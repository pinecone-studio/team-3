import { drizzle } from 'drizzle-orm/d1';
import { maintenanceTickets } from '../../../../db';
import { QueryResolvers, MaintenanceSeverityEnum, TicketStatusEnum } from '../../../../types/generated';

export const getMaintenanceTickets: QueryResolvers['getMaintenanceTickets'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const allTickets = await DB.select().from(maintenanceTickets).all();

		return allTickets.map((ticket) => ({
			...ticket,
			// 1. Cast string from DB to GraphQL Enums
			severity: ticket.severity as MaintenanceSeverityEnum | null,
			status: ticket.status as TicketStatusEnum,

			// 2. Convert Date object to ISO String
			resolvedAt: ticket.resolvedAt ? ticket.resolvedAt.toISOString() : null,

			// 3. Ensure any other nulls match 'Maybe' types (usually handled by Drizzle)
			vendorId: ticket.vendorId ?? null,
			repairCost: ticket.repairCost ?? null,
		}));
	} catch (error) {
		console.error('Failed to list maintenance tickets:', error);
		return [];
	}
};
