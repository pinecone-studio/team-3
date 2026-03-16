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

		if (input.signatureR2Key) {
			// SCENARIO A: User drew a NEW signature (Base64)
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
			}
			// SCENARIO B: User is reusing an EXISTING signature key
			else {
				// We just keep updateData.signatureR2Key as the key passed from frontend
				isSignatureUpdate = true;
			}
		}

		if (updateData.returnedAt) {
			updateData.returnedAt = new Date(updateData.returnedAt);
		}

		const finalUpdate = Object.fromEntries(Object.entries(updateData).filter(([_, v]) => v !== null));

		// Fetch current assignment to get employeeId and assetId
		const currentAssignment = await DB.select().from(assignments).where(eq(assignments.id, id)).get();
		if (!currentAssignment) throw new Error('Assignment not found.');

		const batchOperations: any[] = [DB.update(assignments).set(finalUpdate).where(eq(assignments.id, id))];

		if (isSignatureUpdate) {
			batchOperations.push(
				DB.update(assets)
					.set({
						assignedTo: currentAssignment.employeeId,
						status: AssetStatusEnum.Assigned,
					})
					.where(eq(assets.id, currentAssignment.assetId)),
			);
		}

		await DB.batch(batchOperations as [any, ...any[]]);
		return Response.Success;
	} catch (error) {
		console.error('Update Assignment Error:', error);
		// Only delete from R2 if we actually uploaded a NEW file in this request
		if (uploadedFileName && R2) {
			await R2.delete(uploadedFileName);
		}
		return Response.Failed;
	}
};
