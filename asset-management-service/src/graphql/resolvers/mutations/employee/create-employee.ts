import { drizzle } from 'drizzle-orm/d1';
import { nanoid } from 'nanoid';
import { employees } from '../../../../db';
import { MutationResolvers, Response } from '../../../../types/generated';

export const createEmployee: MutationResolvers['createEmployee'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		await DB.insert(employees).values({
			id: nanoid(),
			...input,
			hireDate: new Date(input.hireDate),
			birthDayAndMonth: input.birthDayAndMonth ?? undefined,
			github: input.github ?? undefined,
			imageUrl: input.imageUrl ?? undefined,
			isKpi: input.isKpi ?? false,
			isSalaryCompany: input.isSalaryCompany ?? false,
		});

		return Response.Success;
	} catch (error) {
		console.error('Failed to create employee:', error);
		return Response.Failed;
	}
};
