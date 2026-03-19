import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm'; // Need eq for the join condition
import { maintenanceTickets, assets } from '../../../../db'; // Import assets table
import { QueryResolvers, MaintenanceSeverityEnum, TicketStatusEnum, AssetStatusEnum } from '../../../../types/generated';

export const getMaintenanceTickets: QueryResolvers['getMaintenanceTickets'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const results = await DB.select().from(maintenanceTickets).leftJoin(assets, eq(maintenanceTickets.assetId, assets.id)).all();

		return results.map(({ maintenance_tickets: ticket, assets: asset }) => ({
			...ticket,
			asset: asset
				? {
						id: asset.id,
						name: asset.name,
						assetTag: asset.assetTag,
						imageUrl: asset.imageUrl,
						qrUrl: asset.qrUrl,
						status: asset.status as AssetStatusEnum, // Cast if necessary
					}
				: null,

			// Cast Enums
			severity: ticket.severity as MaintenanceSeverityEnum | null,
			status: ticket.status as TicketStatusEnum,

			// FIX: Convert Date objects back to ISO Strings to satisfy the "string" type
			createdAt: ticket.createdAt ? new Date(ticket.createdAt).toISOString() : '',
			updatedAt: ticket.updatedAt ? new Date(ticket.updatedAt).toISOString() : '',
			resolvedAt: ticket.resolvedAt ? new Date(ticket.resolvedAt).toISOString() : null,

			vendorId: ticket.vendorId ?? null,
			repairCost: ticket.repairCost ?? null,
		}));
	} catch (error) {
		console.error('Failed to list maintenance tickets:', error);
		return [];
	}
};
