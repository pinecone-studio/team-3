import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';

export const createAssignment: MutationResolvers['createAssignment'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.insert(assignments).values({
			// 1. Generate a fresh UUID for the assignment record
			id: crypto.randomUUID(),

			// 2. Map IDs from the input
			assetId: input.assetId,
			employeeId: input.employeeId,

			// 3. Transform assignedAt: Use provided date or default to current time
			assignedAt: input.assignedAt ? new Date(input.assignedAt) : new Date(),

			// 4. Required condition field
			conditionAtAssign: input.conditionAtAssign,

			// 5. Handling the JSON field
			// We check if it exists and pass it through as a string for D1
			accessoriesJson: input.accessoriesJson ?? undefined,

			// Note: returnedAt, conditionAtReturn, and signatureR2Key
			// are omitted here as they are null by default upon creation.
		});

		return Response.Success;
	} catch (error) {
		console.error('Create Assignment Error:', error);
		// You might want to log if the error is a Foreign Key constraint violation
		// (e.g., trying to assign an assetId or employeeId that doesn't exist)
		return Response.Failed;
	}
};
