import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("server/.env") });

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

// Create S3 instance
const s3 = new AWS.S3();

// Function to upload a file buffer to S3
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `uploads/${Date.now()}-${fileName}`,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "public-read", // file will be accessible by URL
  };

  try {
    const result = await s3.upload(params).promise();
    console.log("✅ Uploaded to S3:", result.Location);
    return result.Location; // public URL
  } catch (err) {
    console.error("❌ S3 Upload Error:", err);
    throw err;
  }
}
