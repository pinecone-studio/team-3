import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm'; // Need eq for the join condition
import { maintenanceTickets, assets } from '../../../../db'; // Import assets table
import { QueryResolvers, MaintenanceSeverityEnum, TicketStatusEnum } from '../../../../types/generated';

export const getMaintenanceTickets: QueryResolvers['getMaintenanceTickets'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	try {
		// Perform the left join
		const results = await DB.select().from(maintenanceTickets).leftJoin(assets, eq(maintenanceTickets.assetId, assets.id)).all();

		return results.map(({ maintenance_tickets: ticket, assets: asset }) => ({
			...ticket,
			// 1. Map Joined Asset Data (assuming your GraphQL schema expects an 'asset' field)
			asset: asset
				? {
						id: asset.id,

						// name: asset.name,
						// ...other asset fields
					}
				: null,

			// 2. Cast string from DB to GraphQL Enums
			severity: ticket.severity as MaintenanceSeverityEnum | null,
			status: ticket.status as TicketStatusEnum,

			// 3. Convert Date objects/strings
			resolvedAt: ticket.resolvedAt ? new Date(ticket.resolvedAt).toISOString() : null,
			createdAt: ticket.createdAt ? new Date(ticket.createdAt).toISOString() : null,

			// 4. Null safety
			vendorId: ticket.vendorId ?? null,
			repairCost: ticket.repairCost ?? null,
		}));
	} catch (error) {
		console.error('Failed to list maintenance tickets:', error);
		return [];
	}
};
