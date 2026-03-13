import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';

export const updateAssignment: MutationResolvers['updateAssignment'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		// 1. Filter out null values to prevent overwriting existing data with empty values
		const filteredInput = Object.fromEntries(Object.entries(input).filter(([_, v]) => v !== null));

		// 2. Transform specific fields that require Type conversion (Dates)
		// We only transform them if they exist in the filtered input
		const updateData = {
			...filteredInput,
			...(input.returnedAt && { returnedAt: new Date(input.returnedAt) }),

			// If your schema also allowed updating the original assigned date:
			// ...(input.assignedAt && { assignedAt: new Date(input.assignedAt) }),
		};

		// 3. Execute the update in D1
		await DB.update(assignments).set(updateData).where(eq(assignments.id, id));

		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);
		return Response.Failed;
	}
};
