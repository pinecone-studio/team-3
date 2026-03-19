import { drizzle } from 'drizzle-orm/d1';
import { nanoid } from 'nanoid';
import { maintenanceTickets } from '../../../../db';
import { MutationResolvers, Response, TicketStatusEnum, MaintenanceSeverityEnum } from '../../../../types/generated';

export const createMaintenanceTicket: MutationResolvers['createMaintenanceTicket'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	// Generate a consistent timestamp for both fields on creation
	const now = new Date();

	try {
		await DB.insert(maintenanceTickets).values({
			id: nanoid(),
			assetId: input.assetId,
			reporterId: input.reporterId,
			description: input.description,
			// Ensure GraphQL Enums (usually UPPERCASE) match your DB expectations
			severity: (input.severity as MaintenanceSeverityEnum) ?? null,
			status: input.status ?? TicketStatusEnum.Open,
			vendorId: input.vendorId ?? null,
			repairCost: input.repairCost ?? null,
			// Explicitly setting these in the resolver to override/match DB defaults
			createdAt: now,
			updatedAt: now,
		});

		return Response.Success;
	} catch (error) {
		console.error('Failed to create maintenance ticket:', error);

		if (error instanceof Error) {
			// Useful for catching D1-specific constraint violations (e.g. invalid foreign keys)
			console.error('D1 Error Detail:', error.message);
		}

		return Response.Failed;
	}
};
