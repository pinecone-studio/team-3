import { drizzle } from 'drizzle-orm/d1';
import { AssetStatusEnum, MutationResolvers, Response } from '../../../../types/generated';
import { assignments, assets } from '../../../../db';
import { eq, and, isNull, ne } from 'drizzle-orm'; // Added helpers

export const updateAssignment: MutationResolvers['updateAssignment'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);
	const R2 = context.env.FILES;
	let uploadedFileName: string | null = null;

	try {
		let updateData: any = { ...input };
		let isSignatureUpdate = false;

		// 1. Handle Signature Upload to R2
		if (input.signatureR2Key) {
			if (input.signatureR2Key.startsWith('data:image')) {
				const fileName = `signatures/${id}-${Date.now()}.png`;
				const base64Data = input.signatureR2Key.split(',')[1];
				const sanitizedBase64 = base64Data.replace(/ /g, '+').replace(/\s/g, '');
				const binaryString = atob(sanitizedBase64);
				const bytes = new Uint8Array(binaryString.length);
				for (let i = 0; i < binaryString.length; i++) {
					bytes[i] = binaryString.charCodeAt(i);
				}
				if (!R2) throw new Error("R2 bucket binding 'FILES' is missing.");
				await R2.put(fileName, bytes, {
					httpMetadata: { contentType: 'image/png' },
				});
				uploadedFileName = fileName;
				updateData.signatureR2Key = fileName;
				isSignatureUpdate = true;
			} else {
				isSignatureUpdate = true;
			}
		}

		if (updateData.returnedAt) {
			updateData.returnedAt = new Date(updateData.returnedAt);
		}

		const finalUpdate = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== null));

		// 2. Fetch current record to get the Asset ID
		const currentAssignment = await DB.select().from(assignments).where(eq(assignments.id, id)).get();
		if (!currentAssignment) throw new Error('Assignment not found.');

		// 3. Prepare Batch Operations
		const batchOperations: any[] = [DB.update(assignments).set(finalUpdate).where(eq(assignments.id, id))];

		if (isSignatureUpdate) {
			// Update Asset Status
			batchOperations.push(
				DB.update(assets)
					.set({
						assignedTo: currentAssignment.employeeId,
						status: AssetStatusEnum.Assigned,
					})
					.where(eq(assets.id, currentAssignment.assetId)),
			);

			// NEW: Delete all other unverified assignments for this asset
			// This clears duplicates for THIS employee AND OTHER employees
			batchOperations.push(
				DB.delete(assignments).where(
					and(
						eq(assignments.assetId, currentAssignment.assetId),
						ne(assignments.id, id), // Don't delete the one we just signed
						isNull(assignments.signatureR2Key), // Only delete unsigned ones
					),
				),
			);
		}

		await DB.batch(batchOperations as [any, ...any[]]);

		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);
		if (uploadedFileName && R2) {
			await R2.delete(uploadedFileName);
		}
		return Response.Failed;
	}
};
