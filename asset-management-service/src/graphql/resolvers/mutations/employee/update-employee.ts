import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { employees } from '../../../../db';

export const updateEmployee: MutationResolvers['updateEmployee'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const filteredInput = Object.fromEntries(Object.entries(input).filter(([_, v]) => v !== null));
		const updateData = {
			...filteredInput,
			...(input.terminationDate && { terminationDate: new Date(input.terminationDate) }),
		};
		await DB.update(employees).set(updateData).where(eq(employees.id, id));

		return Response.Success;
	} catch (error) {
		console.error('Update Employee Error:', error);
		return Response.Failed;
	}
};
