import { drizzle } from 'drizzle-orm/d1';
import { and, eq, isNull } from 'drizzle-orm';
import { QueryResolvers } from '../../../../types/generated';
import { censusTasks, assignments } from '../../../../db';

export const getCensusReport: QueryResolvers['getCensusReport'] = async (_, { censusId }, context) => {
	const DB = drizzle(context.env.DB);

	const rows = await DB.select({
		taskId: censusTasks.id,
		verifiedAt: censusTasks.verifiedAt,
		discrepancyFlag: censusTasks.discrepancyFlag,
		conditionReported: censusTasks.conditionReported,
		locationConfirmed: censusTasks.locationConfirmed,
		conditionAtAssign: assignments.conditionAtAssign,
	})
		.from(censusTasks)
		.leftJoin(assignments, and(eq(assignments.assetId, censusTasks.assetId), isNull(assignments.returnedAt)))
		.where(eq(censusTasks.censusId, censusId));

	const totalAssets = rows.length;

	const verifiedCount = rows.filter((row) => row.verifiedAt !== null).length;

	const discrepancies = rows.filter((row) => row.discrepancyFlag === true).length;

	const conditionChanges = rows.filter((row) => {
		if (!row.conditionReported) return false;
		if (!row.conditionAtAssign) return false;
		return row.conditionReported.trim() !== row.conditionAtAssign.trim();
	}).length;

	const actionItems = rows.filter((row) => {
		const changedCondition =
			row.conditionReported && row.conditionAtAssign && row.conditionReported.trim() !== row.conditionAtAssign.trim();

		return row.discrepancyFlag === true || row.locationConfirmed === false || changedCondition === true;
	}).length;

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
