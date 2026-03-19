import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { maintenanceTickets } from '../../../../db';
import { QueryResolvers, MaintenanceSeverityEnum, TicketStatusEnum } from '../../../../types/generated';

export const getMaintenanceTicketById: QueryResolvers['getMaintenanceTicketById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const ticket = await DB.select().from(maintenanceTickets).where(eq(maintenanceTickets.id, id)).get();

		if (!ticket) return null;

		return {
			...ticket,
			// 1. Cast DB strings to GraphQL Enums
			severity: ticket.severity as MaintenanceSeverityEnum | null,
			status: ticket.status as TicketStatusEnum,

			// 2. MANDATORY: Convert ALL Date objects to ISO Strings
			// Based on your previous error, these MUST be strings
			createdAt: new Date(ticket.createdAt).toISOString(),
			updatedAt: new Date(ticket.updatedAt).toISOString(),
			resolvedAt: ticket.resolvedAt ? new Date(ticket.resolvedAt).toISOString() : null,

			// 3. Ensure null safety for Optional fields
			vendorId: ticket.vendorId ?? null,
			repairCost: ticket.repairCost ?? null,

			// Note: If this query should also include the 'asset' join like the list query,
			// you would need to add the .leftJoin() and the asset mapping here as well.
		};
	} catch (error) {
		console.error('Failed to fetch maintenance ticket:', error);
		return null;
	}
};
