import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../types/generated';
import * as schema from '../../../db';
import { jwtVerify } from 'jose';

export const getPendingAssignments: QueryResolvers['getPendingAssignments'] = async (_, { token }, context) => {
	const DB = drizzle(context.env.DB, { schema });
	const secret = new TextEncoder().encode(context.env.JWT_SECRET);

	try {
		const { payload } = await jwtVerify(token, secret);
		// We use 'employeeId' because that's what we named the key in our SignJWT
		const empId = payload.employeeId as string;

		const results = await DB.query.assignments.findMany({
			where: (assignments, { eq, isNull, and }) => and(eq(assignments.employeeId, empId), isNull(assignments.signatureR2Key)),
			with: {
				asset: {
					with: { category: true },
				},
			},
		});
		return results.map((res) => ({
			...res,
			// Fix 1: Handle the JSON field from before
			accessoriesJson: res.accessoriesJson ? JSON.stringify(res.accessoriesJson) : null,

			// Fix 2: Convert Assignment Dates to Strings
			assignedAt: res.assignedAt.toISOString(),
			returnedAt: res.returnedAt?.toISOString() ?? null,

			// Fix 3: Deep Map the Asset dates
			asset: {
				...res.asset,
				purchaseDate: res.asset.purchaseDate?.toISOString() ?? null,
				deletedAt: res.asset.deletedAt?.toISOString() ?? null,
			},
		}));
	} catch (error) {
		throw new Error('Link expired or invalid.');
	}
};
