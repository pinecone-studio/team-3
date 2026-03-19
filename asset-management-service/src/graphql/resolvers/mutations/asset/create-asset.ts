import { drizzle } from 'drizzle-orm/d1';
import { MutationResolvers, Response } from '../../../../types/generated';
import { assets } from '../../../../db';
import { uploadImage } from '../../../../utils/r2-upload';
import { renderSVG } from 'uqr';
export const createAsset: MutationResolvers['createAsset'] = async (_, { input }, context) => {
    const DB = drizzle(context.env.DB);
    console.log('0')
    try {
        const { imageBase64, ...assetInput } = input;
        const assetId = crypto.randomUUID();

        const r2Env = {
            R2_ACCOUNT_ID: context.env.R2_ACCOUNT_ID,
            R2_ACCESS_KEY_ID: context.env.R2_ACCESS_KEY_ID,
            R2_SECRET_ACCESS_KEY: context.env.R2_SECRET_ACCESS_KEY,
            R2_BUCKET_NAME: context.env.R2_BUCKET_NAME,
        };

        const imageBuffer = Buffer.from(imageBase64, 'base64');
        console.log("1")
        const qrBuffer = await generateQRBuffer(assetId);

        const [imageUrl, qrUrl] = await Promise.all([
            uploadImage({ file: imageBuffer, env: r2Env }),
            uploadImage({ 
                file: qrBuffer, 
                fileName: `qr-${assetId}.svg`,  
                contentType: 'image/svg+xml',   
                env: r2Env 
            }),
        ]);
        const date = new Date(assetInput.purchaseDate);
        await DB.insert(assets).values({
            id: assetId,
            assetTag: assetInput.assetTag,
            categoryId: assetInput.categoryId,
            subCategoryId: assetInput.subCategoryId,
            serialNumber: assetInput.serialNumber,
            status: assetInput.status ?? undefined,
            locationId: assetInput.locationId,
            purchaseDate: date,
            purchaseCost: assetInput.purchaseCost,
            imageUrl,
            qrUrl,
            departmentId:assetInput.departmentId
        });

        return Response.Success;
    } catch (error) {
        console.error('Asset Insert failed:', error);
        return Response.Failed;
    }
};



async function generateQRBuffer(assetId: string): Promise<Buffer> {
    const svg = renderSVG(assetId, {
        ecc: 'H',
        border: 2, 
    });

    return Buffer.from(svg, 'utf-8');
}