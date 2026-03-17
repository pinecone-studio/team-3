import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assignments } from '../../../../db/schema/assignments.schema';

export const deleteAssignment: MutationResolvers['deleteAssignment'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.delete(assignments).where(eq(assignments.id, id));
		return Response.Success;
	} catch (error) {
		console.error('Delete Assignment Error:', error);
		return Response.Failed;
	}
};
