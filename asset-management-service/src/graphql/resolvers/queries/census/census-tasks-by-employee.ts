import { drizzle } from 'drizzle-orm/d1';
import { and, eq, isNull } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const censusTasksByEmployee: QueryResolvers['censusTasksByEmployee'] = async (_, { employeeId }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const tasks = await DB.select()
			.from(censusTasks)
			.where(and(eq(censusTasks.verifierId, employeeId), isNull(censusTasks.verifiedAt)));

		// Map the database rows to the GraphQL CensusTask type
		return tasks.map((task) => ({
			...task,
			// Ensure ID is a string and handle null dates
			id: String(task.id),
			verifiedAt: task.verifiedAt ? new Date(task.verifiedAt).toISOString() : null,
			// These will be null unless you have Field Resolvers or Joins
			asset: null,
			verifier: null,
		}));
	} catch (error) {
		console.error('Error in censusTasksByEmployee:', error);
		throw new Error('Failed to fetch pending census tasks.');
	}
};
