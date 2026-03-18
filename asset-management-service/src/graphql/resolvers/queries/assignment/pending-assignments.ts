import { drizzle } from 'drizzle-orm/d1';
import { QueryResolvers } from '../../../../types/generated';
import * as schema from '../../../../db';
import { jwtVerify } from 'jose';
import { desc } from 'drizzle-orm';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const getPendingAssignments: QueryResolvers['getPendingAssignments'] = async (_, { token }, context) => {
	const DB = drizzle(context.env.DB, { schema });
	const secret = new TextEncoder().encode(context.env.JWT_SECRET);

	let empId: string;

	// 1. Determine if token is a JWT or a raw ID
	try {
		// Attempt to verify as JWT
		const { payload } = await jwtVerify(token, secret);
		empId = payload.employeeId as string;
	} catch (error) {
		// If JWT verification fails, assume the token IS the employeeId
		// You might want to add a basic regex check here if your IDs follow a specific format
		empId = token;
	}

	if (!empId) {
		throw new Error('Invalid identifier provided.');
	}

	// Initialize S3 Client for R2
	const s3 = new S3Client({
		region: 'auto',
		endpoint: `https://${context.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: context.env.R2_ACCESS_KEY_ID,
			secretAccessKey: context.env.R2_SECRET_ACCESS_KEY,
		},
	});

	try {
		// 2. Get current pending assignments using the extracted empId
		const pendingResults = await DB.query.assignments.findMany({
			where: (assignments, { eq, isNull, and }) => and(eq(assignments.employeeId, empId), isNull(assignments.signatureR2Key)),
			with: {
				asset: { with: { category: true } },
			},
		});

		// 3. Fetch the most recent signed assignment
		const lastSigned = await DB.query.assignments.findFirst({
			where: (assignments, { eq, isNotNull, and }) => and(eq(assignments.employeeId, empId), isNotNull(assignments.signatureR2Key)),
			orderBy: [desc(schema.assignments.assignedAt)],
		});

		// 4. Generate URL (Logic remains the same)
		let previewUrl: string | null = null;
		if (lastSigned?.signatureR2Key) {
			const command = new GetObjectCommand({
				Bucket: context.env.R2_BUCKET_NAME,
				Key: lastSigned.signatureR2Key,
			});
			previewUrl = await getSignedUrl(s3, command, { expiresIn: 900 });
		}

		return pendingResults.map((res) => ({
			...res,
			recentSignatureUrl: previewUrl,
			recentSignatureKey: lastSigned?.signatureR2Key ?? null,
			accessoriesJson: res.accessoriesJson ? JSON.stringify(res.accessoriesJson) : null,
			assignedAt: res.assignedAt.toISOString(),
			returnedAt: res.returnedAt?.toISOString() ?? null,
			asset: {
				...res.asset,
				purchaseDate: res.asset.purchaseDate?.toISOString() ?? null,
				deletedAt: res.asset.deletedAt?.toISOString() ?? null,
			},
		}));
	} catch (error) {
		console.error('Pending Assignments Error:', error);
		throw new Error('Could not retrieve assignments.');
	}
};
