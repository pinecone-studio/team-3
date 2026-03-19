import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assets } from '../../../../db';
import { uploadImage } from '../../../../utils/r2-upload';


export const createAsset: MutationResolvers['createAsset'] = async (_, { input }, context) => {
    const DB = drizzle(context.env.DB);

    try {
        const { imageBase64, ...assetInput } = input;

        const imageBuffer = Buffer.from(imageBase64, "base64");
        const imageUrl = await uploadImage({
            file: imageBuffer,
            env: {
                R2_ACCOUNT_ID: context.env.R2_ACCOUNT_ID ,
                R2_ACCESS_KEY_ID: context.env.R2_ACCESS_KEY_ID,
                R2_SECRET_ACCESS_KEY: context.env.R2_SECRET_ACCESS_KEY,
                R2_BUCKET_NAME: context.env.R2_BUCKET_NAME,
            },
        });

        await DB.insert(assets).values({
            ...assetInput,
            id: crypto.randomUUID(),
            imageUrl,
            status: assetInput.status ?? undefined,
            purchaseDate: assetInput.purchaseDate ? new Date(assetInput.purchaseDate) : undefined,
            locationId: assetInput.locationId ?? undefined,
            purchaseCost: assetInput.purchaseCost ?? undefined,
            serialNumber: assetInput.serialNumber ?? undefined,
        });

        return Response.Success;
    } catch (error) {
        console.error('Asset Insert failed:', error);
        return Response.Failed;
    }
};