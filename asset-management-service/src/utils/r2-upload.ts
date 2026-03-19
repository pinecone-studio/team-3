import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

type R2Env ={
    R2_ACCOUNT_ID: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    R2_BUCKET_NAME: string;
}

export async function uploadImage({
    file,
    env,
}: {
    file: Buffer | ArrayBuffer;
    contentType?: string;
    env: R2Env;
}): Promise<string> {
    const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: env.R2_ACCESS_KEY_ID,
            secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        },
    });

    const ext = "image/png"
    const key = `uploads/${crypto.randomUUID()}.png`;

    const command = new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: file instanceof ArrayBuffer ? Buffer.from(file) : file,
        ContentType:ext,
    });

    try {
        await s3.send(command);
        return `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET_NAME}/${key}`;
    } catch (error) {
        console.error("❌ Upload failed:", error);
        throw error;
    }
}