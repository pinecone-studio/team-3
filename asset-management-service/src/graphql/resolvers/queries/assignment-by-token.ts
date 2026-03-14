import { drizzle } from 'drizzle-orm/d1';
import { eq, and, isNull } from 'drizzle-orm';
import { QueryResolvers } from '../../../types/generated';
import { assignments } from '../../../db/schema/assigments.schema';
import { assets } from '../../../db/schema/assets.schema'; // Ensure this is imported
import { verifyAssignmentToken } from '../../../utils/jwt-decode';

export const getAssignmentByToken: QueryResolvers['getAssignmentByToken'] = async (_, { token }, context) => {
	const DB = drizzle(context.env.DB);

	// 1. Verify token
	const { assignmentId } = await verifyAssignmentToken(token, context.env.JWT_SECRET);

	// 2. Query with Join
	const result = await DB.select({
		assignment: assignments,
		asset: assets,
	})
		.from(assignments)
		.innerJoin(assets, eq(assignments.assetId, assets.id))
		.where(and(eq(assignments.id, assignmentId), isNull(assignments.signatureR2Key)))
		.get();

	if (!result) {
		throw new Error('Assignment not found or already signed.');
	}

	// 3. Explicitly map to match the Generated 'Assignment' type
	return {
		// Spread the assignment fields
		...result.assignment,
		assignedAt: result.assignment.assignedAt.toISOString(),
		returnedAt: result.assignment.returnedAt?.toISOString() || null,

		// Fix the 'unknown' to 'string | null' issue
		accessoriesJson: result.assignment.accessoriesJson as string | null,

		// Ensure the nested asset matches
		asset: {
			...result.asset,
			// If asset dates are objects and GQL expects strings, use .toISOString()
			purchaseDate: result.asset.purchaseDate?.toISOString(),
			deletedAt: result.asset.deletedAt?.toISOString(),
		},
	};
};
