import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { maintenanceTickets } from '../../../../db';
import { QueryResolvers, MaintenanceSeverityEnum, TicketStatusEnum } from '../../../../types/generated';

export const getMaintenanceTicketById: QueryResolvers['getMaintenanceTicketById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const ticket = await DB.select().from(maintenanceTickets).where(eq(maintenanceTickets.id, id)).get();

		if (!ticket) return null;

		// Transform the database row to match GraphQL types
		return {
			...ticket,
			// 1. Cast DB strings to GraphQL Enums
			severity: ticket.severity as MaintenanceSeverityEnum | null,
			status: ticket.status as TicketStatusEnum,

			// 2. Convert Date object to ISO String for GraphQL
			resolvedAt: ticket.resolvedAt ? ticket.resolvedAt.toISOString() : null,

			// 3. Ensure optional fields match 'Maybe' types (null vs undefined)
			vendorId: ticket.vendorId ?? null,
			repairCost: ticket.repairCost ?? null,
		};
	} catch (error) {
		console.error('Failed to fetch maintenance ticket:', error);
		// Returning null is usually safer for single-item queries in GraphQL
		// than throwing a hard error, but you can keep the throw if preferred.
		return null;
	}
};
