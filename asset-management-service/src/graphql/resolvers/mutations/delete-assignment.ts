import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';

export const deleteAssignment: MutationResolvers['deleteAssignment'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		// Hard delete: Permanently removes the record from the assignment history
		const result = await DB.delete(assignments).where(eq(assignments.id, id));

		// Optional: You could check result.meta.changes to see if a row was actually deleted,
		// but returning Success is standard for idempotent delete operations.
		return Response.Success;
	} catch (error) {
		console.error('Delete Assignment Error:', error);
		return Response.Failed;
	}
};
