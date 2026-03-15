import { drizzle } from 'drizzle-orm/d1';
import { AssetStatusEnum, MutationResolvers, Response } from '../../../types/generated';
import { assignments, assets } from '../../../db';
import { eq } from 'drizzle-orm';

export const updateAssignment: MutationResolvers['updateAssignment'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);
	const R2 = context.env.FILES;

	let uploadedFileName: string | null = null;

	try {
		let updateData: any = { ...input };
		let isSignatureUpdate = false;

		// 1. R2 Logic & Sanitization
		if (input.signatureR2Key && input.signatureR2Key.startsWith('data:image')) {
			const fileName = `signatures/${id}-${Date.now()}.png`;
			const base64Data = input.signatureR2Key.split(',')[1];

			// Clean up base64 string
			const sanitizedBase64 = base64Data.replace(/ /g, '+').replace(/\s/g, '');

			const binaryString = atob(sanitizedBase64);
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}

			if (!R2) throw new Error("R2 bucket binding 'FILES' is missing.");

			// Upload to R2
			await R2.put(fileName, bytes, {
				httpMetadata: { contentType: 'image/png' },
			});

			// Keep track of this for potential cleanup
			uploadedFileName = fileName;

			updateData.signatureR2Key = fileName;
			isSignatureUpdate = true;
		}

		// 2. Date formatting
		if (updateData.returnedAt) {
			updateData.returnedAt = new Date(updateData.returnedAt);
		}

		// 3. Remove nulls to prevent overwriting with empty data
		const finalUpdate = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== null));

		// 4. Fetch current record to get Asset and Employee IDs
		const currentAssignment = await DB.select().from(assignments).where(eq(assignments.id, id)).get();

		if (!currentAssignment) throw new Error('Assignment not found.');

		// 5. ATOMIC BATCH OPERATION
		// This ensures the Assignment and the Asset status change happen as one unit.
		const batchOperations: any[] = [DB.update(assignments).set(finalUpdate).where(eq(assignments.id, id))];

		if (isSignatureUpdate) {
			batchOperations.push(
				DB.update(assets)
					.set({
						assignedTo: currentAssignment.employeeId,
						status: AssetStatusEnum.Assigned, // Moves asset from AVAILABLE to ASSIGNED
					})
					.where(eq(assets.id, currentAssignment.assetId)),
			);
		}

		// Execute batch transaction
		await DB.batch(batchOperations as [any, ...any[]]);

		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);

		// OPTIONAL: Cleanup orphaned R2 file if DB transaction failed
		if (uploadedFileName && R2) {
			await R2.delete(uploadedFileName);
		}

		return Response.Failed;
	}
};
