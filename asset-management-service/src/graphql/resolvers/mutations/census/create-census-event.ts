import { drizzle } from 'drizzle-orm/d1';
import { and, eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assets, assignments, censusEvents, censusTasks, employees } from '../../../../db';

export const createCensusEvent: MutationResolvers['createCensusEvent'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);
	const censusId = crypto.randomUUID();

	try {
		await DB.insert(censusEvents).values({
			id: censusId,
			name: input.name,
			scope: input.scope,
			scopeFilter: input.scopeFilter ?? undefined,
			startedAt: input.startedAt ? new Date(input.startedAt) : new Date(),
			closedAt: input.closedAt ? new Date(input.closedAt) : undefined,
			createdBy: input.createdBy,
		});

		const assignedAssets = await DB.select({
			assetId: assets.id,
			category: assets.categoryId,
			employeeId: assignments.employeeId,
			department: employees.department,
		})
			.from(assignments)
			.innerJoin(assets, eq(assignments.assetId, assets.id))
			.innerJoin(employees, eq(assignments.employeeId, employees.id))
			.where(and(isNull(assets.deletedAt), isNull(assignments.returnedAt)));

		let filteredAssets = assignedAssets;

		if (input.scope === 'category' && input.scopeFilter) {
			filteredAssets = assignedAssets.filter((item) => item.category === input.scopeFilter);
		}

		if (input.scope === 'department' && input.scopeFilter) {
			filteredAssets = assignedAssets.filter((item) => item.department === input.scopeFilter);
		}

		const uniqueAssets = Array.from(new Map(filteredAssets.map((item) => [item.assetId, item])).values());
		if (uniqueAssets.length > 0) {
			for (const item of uniqueAssets) {
				try {
					console.log('INSERTING CENSUS TASK:', {
						censusId,
						assetId: item.assetId,
						employeeId: item.employeeId,
						department: item.department,
						category: item.category,
					});

					await DB.insert(censusTasks).values({
						id: crypto.randomUUID(),
						censusId,
						assetId: item.assetId,
						verifierId: undefined,
						verifiedAt: undefined,
						conditionReported: undefined,
						locationConfirmed: false,
						discrepancyFlag: false,
					});
				} catch (taskError) {
					console.error('FAILED TASK INSERT:', {
						censusId,
						assetId: item.assetId,
						employeeId: item.employeeId,
						department: item.department,
						category: item.category,
					});
					console.error('TASK INSERT ERROR:', taskError);
					throw taskError;
				}
			}
		}

		return Response.Success;
	} catch (error) {
		console.error('Create Census Event failed:', error);
		console.error('Create Census Event input:', input);
		console.error('Create Census Event createdBy:', input.createdBy);
		console.error('Create Census Event scope:', input.scope);
		console.error('Create Census Event scopeFilter:', input.scopeFilter);
		console.error('Create Census Event startedAt:', input.startedAt);
		console.error('Create Census Event closedAt:', input.closedAt);

		try {
			await DB.delete(censusEvents).where(eq(censusEvents.id, censusId));
		} catch (rollbackError) {
			console.error('Rollback failed:', rollbackError);
		}

		return Response.Failed;
	}
};
