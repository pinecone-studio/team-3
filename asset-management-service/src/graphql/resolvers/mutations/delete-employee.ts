import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../types/generated';
import { employees } from '../../../db';

export const deleteEmployee: MutationResolvers['deleteEmployee'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);
	try {
		await DB.update(employees)
			.set({
				terminationDate: new Date(input.terminationDate),
				status: 'TERMINATED' as any,
			})
			.where(eq(employees.id, id));

		return Response.Success;
	} catch (error) {
		console.error('Manual soft delete failed:', error);
		return Response.Failed;
	}
};
