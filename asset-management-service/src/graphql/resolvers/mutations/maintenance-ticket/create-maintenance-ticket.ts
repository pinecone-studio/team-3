import { drizzle } from 'drizzle-orm/d1';
import { nanoid } from 'nanoid';
import { maintenanceTickets } from '../../../../db';
import { MutationResolvers, Response, TicketStatusEnum } from '../../../../types/generated';

export const createMaintenanceTicket: MutationResolvers['createMaintenanceTicket'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.insert(maintenanceTickets).values({
			id: nanoid(),
			assetId: input.assetId,
			reporterId: input.reporterId,
			description: input.description,

			// Explicitly cast to match the Drizzle schema's expected string enum
			severity: input.severity as any,

			// Ensure status defaults to the Open enum member if not provided
			status: (input.status as any) || TicketStatusEnum.Open,

			vendorId: input.vendorId ?? undefined,
			repairCost: input.repairCost ?? undefined,
			// resolvedAt is usually null on creation
		});

		return Response.Success;
	} catch (error) {
		console.error('Failed to create maintenance ticket:', error);
		return Response.Failed;
	}
};
