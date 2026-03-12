import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, QueryResolvers, Response } from '../../../types/generated';
import { employees } from '../../../db';
import { nanoid } from 'nanoid';

export const createEmployee: MutationResolvers['createEmployee'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.insert(employees).values({
			id: nanoid(),
			...input,
			// Convert the ISO string date from the frontend back to a Unix timestamp for D1
			hireDate: new Date(input.hireDate),
			birthDayAndMonth: input.birthDayAndMonth ?? undefined,
			github: input.github ?? undefined,
			imageUrl: input.imageUrl ?? undefined,
			isKpi: input.isKpi ?? false, // Ensure booleans have defaults if missing
			isSalaryCompany: input.isSalaryCompany ?? false,

			// If your DB has fields not in the 'input' (like auto-generated IDs or timestamps)
			// Drizzle handles them if defined in the schema, or you can add them here:
			// createdAt: Date.now(),
		});

		return Response.Success;
	} catch (error) {
		// Log the error to your Wrangler console so you can see why it failed
		console.error('Failed to create employee:', error);

		return Response.Failed;
	}
};
