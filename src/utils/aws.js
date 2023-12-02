import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

const s3 = new AWS.S3();

export const imageUpload = async (file, slug) => {
  var uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: slug + "_" + file.name,
    Body: Buffer.from(file.data, "binary"),
  };

  try {
    const data = await s3.upload(uploadParams).promise();

    return data.Location;
  } catch (error) {
    console.error(error);
  }
};
