import { drizzle } from 'drizzle-orm/d1';
import { AssetStatusEnum, MutationResolvers, Response } from '../../../../types/generated';
import { assets } from '../../../../db';
import { eq } from 'drizzle-orm';
import { notifyAdmins } from '../../../../utils/send-mail-to-admin';

export const updateAsset: MutationResolvers['updateAsset'] = async (_, { id, input }, context) => {
	const DB = drizzle(context.env.DB);

	try {
		const cleanInput = Object.fromEntries(Object.entries(input).filter(([_, value]) => value !== null && value !== undefined)) as any;

		if (input.purchaseDate) {
			cleanInput.purchaseDate = new Date(input.purchaseDate);
		}

		if (Object.keys(cleanInput).length > 0) {
			await DB.update(assets).set(cleanInput).where(eq(assets.id, id));
		}

		if (input.status || input.assignedTo) {
			context.waitUntil(
				notifyAdmins(context, id, 'MANUAL_UPDATE', {
					status: input.status as string,
				}).catch((e) => console.error('Shared Notification Error:', e)),
			);
		}

		return Response.Success;
	} catch (error) {
		console.error('Update Asset Error:', error);
		return Response.Failed;
	}
};
