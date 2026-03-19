import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { maintenanceTickets } from '../../../../db';
import { MutationResolvers, Response } from '../../../../types/generated';

export const updateMaintenanceTicket: MutationResolvers['updateMaintenanceTicket'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		// Fix: Added 'const result =' to capture the execution metadata
		const result = await DB.update(maintenanceTickets)
			.set({
				// Non-nullable fields: use ?? undefined to skip if null/missing
				description: input.description ?? undefined,
				assetId: input.assetId ?? undefined,
				reporterId: input.reporterId ?? undefined,

				// Enum and optional fields
				severity: (input.severity as any) ?? undefined,
				status: (input.status as any) ?? undefined,
				vendorId: input.vendorId ?? undefined,
				repairCost: input.repairCost ?? undefined,

				// Handle Date conversion for SQLite timestamp mode
				resolvedAt: input.resolvedAt ? new Date(input.resolvedAt) : undefined,
			})
			.where(eq(maintenanceTickets.id, id))
			.run();

		// result.meta.changes will be 0 if the 'id' provided didn't exist
		if (result.meta.changes === 0) {
			console.warn(`Update failed: No maintenance ticket found with id: ${id}`);
			return Response.Failed;
		}

		return Response.Success;
	} catch (error) {
		console.error('Failed to update maintenance ticket:', error);
		return Response.Failed;
	}
};
