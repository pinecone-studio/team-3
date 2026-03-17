import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { censusTasks } from '../../../../db';

export const getCensusReport: QueryResolvers['getCensusReport'] = async (_, { censusId }, context) => {
	const DB = drizzle(context.env.DB);

	const tasks = await DB.select().from(censusTasks).where(eq(censusTasks.censusId, censusId));

	const totalAssets = tasks.length;
	const verifiedCount = tasks.filter((task) => task.verifiedAt !== null).length;
	const discrepancies = tasks.filter((task) => task.discrepancyFlag === true).length;

	// Best-effort version:
	// counts tasks where someone reported a condition value.
	// If your assets table has an original condition column, compare against that instead.
	const conditionChanges = tasks.filter((task) => task.conditionReported !== null && task.conditionReported !== '').length;

	// Action items = things needing follow-up
	const actionItems = tasks.filter(
		(task) =>
			task.discrepancyFlag === true ||
			task.locationConfirmed === false ||
			(task.conditionReported !== null && task.conditionReported !== ''),
	).length;

	const verifiedPercentage = totalAssets === 0 ? 0 : (verifiedCount / totalAssets) * 100;

	return {
		totalAssets,
		verifiedCount,
		verifiedPercentage,
		discrepancies,
		conditionChanges,
		actionItems,
	};
};
