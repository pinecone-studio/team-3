import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const getCensusTaskById: QueryResolvers['getCensusTaskById'] = async (_, { id }, context) => {
	const DB = drizzle(context.env.DB);

	const results = await DB.select().from(censusTasks).where(eq(censusTasks.id, id));

	const task = results[0];

	if (!task) return null;

	return {
		...task,
		verifierId: task.verifierId ?? undefined,
		verifiedAt: task.verifiedAt ? task.verifiedAt.toISOString() : undefined,
		conditionReported: task.conditionReported ?? undefined,
	};
};
