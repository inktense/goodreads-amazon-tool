import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const client = new S3Client({ region: process.env.REGION });

export const putS3Document = async (bucket, key, body) => {
  console.log(bucket, key);
  try {
    const input = {
      Bucket: bucket,
      Key: key,
      Body: body,
    };

    const command = new PutObjectCommand(input);
    const data = await client.send(command);

    return data;
  } catch (err) {
    console.log(err);
    const message = `Error adding object ${key} in bucket ${bucket}.`;
    console.log(message);
    throw new Error(message);
  }
};
