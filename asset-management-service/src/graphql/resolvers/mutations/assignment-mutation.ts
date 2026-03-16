import { assets, employees } from '../../../db/schema';
import { eq, and, isNull } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { drizzle } from 'drizzle-orm/d1';
import { assignments } from '../../../db/schema/assignments.schema';
import { AssetStatusEnum } from '../../../types/generated';

export const assignmentMutations = {
	assignAsset: async (_parent: any, { assetId, employeeId, condition }: any, context: any) => {
		const db = drizzle(context.env.DB);
		const asset = await db.select().from(assets).where(eq(assets.id, assetId)).get();
		if (!asset || asset.status !== 'AVAILABLE') {
			throw new GraphQLError('Asset is not available for assignment', {
				extensions: { code: 'INVALID_STATUS_TRANSITION' },
			});
		}
		const employee = await db.select().from(employees).where(eq(employees.id, employeeId)).get();
		if (!employee || employee.status === 'TERMINATED') {
			throw new GraphQLError('Cannot assign assets to terminated employees', {
				extensions: { code: 'FORBIDDEN_ACTION' },
			});
		}
		return await db.transaction(async (tx) => {
			await tx.update(assets).set({ status: AssetStatusEnum.Assigned, assignedTo: employeeId }).where(eq(assets.id, assetId));
			const [record] = await tx
				.insert(assignments)
				.values({
					id: crypto.randomUUID(),
					assetId,
					employeeId,
					conditionAtAssign: condition,
				})
				.returning();

			return record;
		});
	},
};
