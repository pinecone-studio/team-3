import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { maintenanceTickets } from '../../../../db';
import { MutationResolvers, Response } from '../../../../types/generated';

export const deleteMaintenanceTicket: MutationResolvers['deleteMaintenanceTicket'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const result = await DB.delete(maintenanceTickets).where(eq(maintenanceTickets.id, id)).run();

		// Optional: Check if a row was actually deleted
		if (result.meta.changes === 0) {
			console.warn(`No maintenance ticket found with id: ${id}`);
			return Response.Failed;
		}

		return Response.Success;
	} catch (error) {
		console.error('Failed to delete maintenance ticket:', error);
		return Response.Failed;
	}
};
