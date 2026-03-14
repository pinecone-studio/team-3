import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';

export const updateAssignment: MutationResolvers['updateAssignment'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const filteredInput = Object.fromEntries(Object.entries(input).filter(([_, v]) => v !== null));
		const updateData = {
			...filteredInput,
			...(input.returnedAt && { returnedAt: new Date(input.returnedAt) }),
		};
		await DB.update(assignments).set(updateData).where(eq(assignments.id, id));

		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);
		return Response.Failed;
	}
};
