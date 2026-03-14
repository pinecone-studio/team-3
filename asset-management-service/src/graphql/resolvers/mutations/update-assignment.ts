import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../types/generated';
import { assignments, assets } from '../../../db';
import { eq } from 'drizzle-orm';

export const updateAssignment: MutationResolvers['updateAssignment'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);
	const R2 = context.env.FILES;

	try {
		let updateData: any = { ...input };
		let isSignatureUpdate = false;

		// 1. R2 Logic & Sanitization
		if (input.signatureR2Key && input.signatureR2Key.startsWith('data:image')) {
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

			updateData.signatureR2Key = fileName;
			isSignatureUpdate = true;
		}

		// 2. Date formatting
		if (updateData.returnedAt) {
			updateData.returnedAt = new Date(updateData.returnedAt);
		}

		// 3. Remove nulls
		const finalUpdate = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== null));

		// 4. Fetch current record
		const currentAssignment = await DB.select().from(assignments).where(eq(assignments.id, id)).get();

		if (!currentAssignment) throw new Error('Assignment not found.');

		// 5. FIXED BATCH LOGIC
		// We cast the array as [any, ...any[]] to stop TypeScript from
		// trying to force the second update to match the first update's table type.
		const batchOperations: any[] = [DB.update(assignments).set(finalUpdate).where(eq(assignments.id, id))];

		if (isSignatureUpdate) {
			batchOperations.push(
				DB.update(assets).set({ assignedTo: currentAssignment.employeeId }).where(eq(assets.id, currentAssignment.assetId)),
			);
		}

		await DB.batch(batchOperations as [any, ...any[]]);

		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);
		return Response.Failed;
	}
};
