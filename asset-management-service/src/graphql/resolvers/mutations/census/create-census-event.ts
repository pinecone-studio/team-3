import { drizzle } from 'drizzle-orm/d1';
import { and, eq, isNull } from 'drizzle-orm';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assets, assignments, censusEvents, censusTasks, employees } from '../../../../db';
import { notifyCensusStart } from '../../../../utils/notify-census-start';

export const createCensusEvent: MutationResolvers['createCensusEvent'] = async (_, { input }, context) => {
	const DB = drizzle(context.env.DB);
	const censusId = crypto.randomUUID();

	try {
		// 1. Fetch relevant assets and employees
		const assignedAssets = await DB.select({
			assetId: assets.id,
			assetTag: assets.assetTag,
			category: assets.categoryId,
			employeeId: employees.id,
			employeeName: employees.firstName,
			employeeEmail: employees.email,
			department: employees.department,
		})
			.from(assignments)
			.innerJoin(assets, eq(assignments.assetId, assets.id))
			.innerJoin(employees, eq(assignments.employeeId, employees.id))
			.where(and(isNull(assets.deletedAt), isNull(assignments.returnedAt)));

		// 2. Filter based on Scope
		let filtered = assignedAssets;
		if (input.scope === 'category' && input.scopeFilter) {
			filtered = assignedAssets.filter((a) => a.category === input.scopeFilter);
		} else if (input.scope === 'department' && input.scopeFilter) {
			filtered = assignedAssets.filter((a) => a.department === input.scopeFilter);
		}

		// 3. De-duplicate assets
		const uniqueAssets = Array.from(new Map(filtered.map((a) => [a.assetId, a])).values());

		if (uniqueAssets.length > 0) {
			// 4. Prepare the Batch Operations
			// This is more performant in D1 than multiple individual await calls
			const censusEventInsert = DB.insert(censusEvents).values({
				id: censusId,
				name: input.name,
				scope: input.scope,
				scopeFilter: input.scopeFilter ?? undefined,
				startedAt: input.startedAt ? new Date(input.startedAt) : new Date(),
				createdBy: input.createdBy,
			});

			// Map assets to task insert objects
			// Note: We omit verifierId, verifiedAt, etc., so they naturally default to NULL in SQLite
			const taskValues = uniqueAssets.map((item) => ({
				id: crypto.randomUUID(),
				censusId: censusId,
				assetId: item.assetId,
				locationConfirmed: false, // Explicitly false as it has no default in schema
				discrepancyFlag: false, // Matches your schema default
			}));

			// 5. Execute in Chunks using Batch
			// We push the event creation as the first statement in the batch
			const statements: any[] = [censusEventInsert];

			const chunkSize = 20; // D1 handles small-to-medium batches very well
			for (let i = 0; i < taskValues.length; i += chunkSize) {
				const chunk = taskValues.slice(i, i + chunkSize);
				statements.push(DB.insert(censusTasks).values(chunk));
			}

			await DB.batch(statements as [any, ...any[]]);

			// 6. Group by Employee for Emailing
			const employeeGroups = uniqueAssets.reduce(
				(acc, item) => {
					if (!item.employeeEmail) return acc;
					if (!acc[item.employeeId]) {
						acc[item.employeeId] = {
							email: item.employeeEmail,
							name: item.employeeName,
							tags: [],
						};
					}
					acc[item.employeeId].tags.push(item.assetTag);
					return acc;
				},
				{} as Record<string, { email: string; name: string; tags: string[] }>,
			);

			// 7. Trigger Notifications
			const notificationPromises = Object.values(employeeGroups).map((emp) =>
				notifyCensusStart(context, { email: emp.email, name: emp.name }, input.name, emp.tags),
			);

			await Promise.allSettled(notificationPromises);
		}

		return Response.Success;
	} catch (error) {
		console.error('Census creation failed:', error);
		return Response.Failed;
	}
};
