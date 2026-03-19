import { eq } from "drizzle-orm";
import { MutationResolvers, Response } from "../../../../types/generated";
import { assets, createDB } from "../../../../db";

import { uploadImage } from "../../../../utils/r2-upload";
import { generateQRBuffer } from "../../../../utils/generateQRBuffer";



function generateAssetTag(): string {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `AST-${rand}`;
}

function generateSerialNumber(): string {
    const rand = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `SN-${rand}`;
}

export const duplicateAsset: MutationResolvers['duplicateAsset'] = async (_, { input }, context) => {
    const { assetId, count } = input;
    const DB = createDB(context.env);

    try {
        const [asset] = await DB.select().from(assets).where(eq(assets.id, assetId));

        const r2Env = {
            R2_ACCOUNT_ID: context.env.R2_ACCOUNT_ID,
            R2_ACCESS_KEY_ID: context.env.R2_ACCESS_KEY_ID,
            R2_SECRET_ACCESS_KEY: context.env.R2_SECRET_ACCESS_KEY,
            R2_BUCKET_NAME: context.env.R2_BUCKET_NAME,
        };

        const duplicates = await Promise.all(
            Array.from({ length: count }, async (_, index) => {  // index нэмлэм
                const newId = crypto.randomUUID();
                const qrBuffer = await generateQRBuffer(newId);
                const qrUrl = await uploadImage({
                    file: qrBuffer,
                    fileName: `qr-${newId}.svg`,
                    contentType: 'image/svg+xml',
                    env: r2Env,
                });
        
                return {
                    id: newId,
                    assetTag: generateAssetTag(),
                    serialNumber: generateSerialNumber(),
                    categoryId: asset.categoryId,
                    subCategoryId: asset.subCategoryId,
                    status: asset.status,
                    purchaseDate: asset.purchaseDate,
                    purchaseCost: asset.purchaseCost,
                    locationId: asset.locationId,
                    assignedTo: null,
                    departmentId: asset.departmentId,
                    imageUrl: asset.imageUrl,
                    qrUrl,
                    name: `${asset.name} Copy (${index + 1})`, 
                };
            })
        );

        await DB.insert(assets).values(duplicates);

        return Response.Success;
    } catch (error) {
        console.error('Duplicate asset failed:', error);
        return Response.Failed;
    }
};