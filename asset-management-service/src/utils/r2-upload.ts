import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

type R2Env = {
    R2_ACCOUNT_ID: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
    R2_BUCKET_NAME: string;
}

export async function uploadImage({
    file,
    fileName,
    env,
    contentType = "image/png",
}: {
    file: Buffer | ArrayBuffer;
    fileName?: string;
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

    const key = fileName
        ? `uploads/${fileName}`
        : `uploads/${crypto.randomUUID()}.png`;

    const command = new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: file instanceof ArrayBuffer ? Buffer.from(file) : file,
        ContentType: contentType,  // ← томоор, параметр ашиглах
    });

    try {
        await s3.send(command);
        return `https://pub-57c81f86eb0847ebabd9ef5de48cc6a2.r2.dev/${key}`;
    } catch (error) {
        console.error("❌ Upload failed:", error);
        throw error;
    }
}