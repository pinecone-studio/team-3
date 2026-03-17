import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const getCensusTasks: QueryResolvers['getCensusTasks'] = async (_, __, context) => {
	const DB = drizzle(context.env.DB);

	const results = await DB.select().from(censusTasks);

	return results.map((task) => ({
		...task,
		verifierId: task.verifierId ?? undefined,
		verifiedAt: task.verifiedAt ? task.verifiedAt.toISOString() : undefined,
		conditionReported: task.conditionReported ?? undefined,
	}));
};
