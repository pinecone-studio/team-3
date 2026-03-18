import { drizzle } from 'drizzle-orm/d1';
import { AssetStatusEnum, MutationResolvers, Response } from '../../../../types/generated';
import { assignments, assets } from '../../../../db';
import * as schema from '../../../../db';
import { eq, and, isNull, ne } from 'drizzle-orm';
import { notifyAdmins } from '../../../../utils/send-mail-to-admin';

export const updateAssignment: MutationResolvers['updateAssignment'] = async (_, { id, input }, context) => {
	// Initialize Drizzle with the full schema for relational queries (e.g., fetching employee names)
	const DB = drizzle(context.env.DB, { schema });
	const R2 = context.env.FILES;
	let uploadedFileName: string | null = null;

	try {
		let updateData: any = { ...input };
		let isSignatureUpdate = false;

		// 1. Handle Signature Upload to R2 (Base64 to Binary)
		if (input.signatureR2Key) {
			if (input.signatureR2Key.startsWith('data:image')) {
				const fileName = `signatures/${id}-${Date.now()}.png`;

				// Extract and decode base64
				const base64Data = input.signatureR2Key.split(',')[1];
				const sanitizedBase64 = base64Data.replace(/ /g, '+').replace(/\s/g, '');
				const binaryString = atob(sanitizedBase64);

				// Create binary buffer for R2
				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}

				if (!R2) throw new Error("R2 bucket binding 'FILES' is missing.");

				// Upload to Cloudflare R2
				await R2.put(fileName, bytes, {
					httpMetadata: { contentType: 'image/png' },
				});

				uploadedFileName = fileName;
				updateData.signatureR2Key = fileName; // Store the R2 path in DB
				isSignatureUpdate = true;
			} else {
				// If it's already a key (not base64), it's a signature reuse
				isSignatureUpdate = true;
			}
		}

		// Handle date conversion
		if (updateData.returnedAt) {
			updateData.returnedAt = new Date(updateData.returnedAt);
		}

		// Clean input for the DB update
		const finalUpdate = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== null && v !== undefined));

		// 2. Fetch current record to get Asset ID and Employee details
		const currentAssignment = await DB.query.assignments.findFirst({
			where: eq(assignments.id, id),
			with: { employee: true },
		});

		if (!currentAssignment) throw new Error('Assignment not found.');

		// 3. Prepare Batch Operations (Atomic - all or nothing)
		const batchOperations: any[] = [DB.update(assignments).set(finalUpdate).where(eq(assignments.id, id))];

		if (isSignatureUpdate) {
			// Update the Asset itself to 'Assigned' status
			batchOperations.push(
				DB.update(assets)
					.set({
						assignedTo: currentAssignment.employeeId,
						status: AssetStatusEnum.Assigned,
					})
					.where(eq(assets.id, currentAssignment.assetId)),
			);

			// Clean up: Delete all other unverified assignments for this asset
			batchOperations.push(
				DB.delete(assignments).where(
					and(eq(assignments.assetId, currentAssignment.assetId), ne(assignments.id, id), isNull(assignments.signatureR2Key)),
				),
			);
		}

		// 4. Execute all database changes in a single batch
		await DB.batch(batchOperations as [any, ...any[]]);

		// 5. Trigger Background Notification
		if (isSignatureUpdate) {
			context.waitUntil(
				notifyAdmins(context, currentAssignment.assetId, 'SIGNATURE', {
					status: 'Assigned',
					employeeName: `${currentAssignment.employee?.firstName} ${currentAssignment.employee?.lastName}`,
				}).catch((e) => console.error('Notification Service Failed:', e)),
			);
		}

		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);

		// Clean up: If DB failed but file was uploaded, delete the orphaned file
		if (uploadedFileName && R2) {
			await R2.delete(uploadedFileName);
		}

		return Response.Failed;
	}
};
