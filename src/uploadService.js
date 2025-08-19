const { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const redis = require('./redisClient');

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_TYPES = ['video/mp4', 'video/webm'];

async function initiateUpload({ fileName, fileType, fileSize }) {
  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new Error('Invalid file type');
  }
  if (fileSize > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }

  const key = `uploads/${uuidv4()}-${fileName}`;
  const command = new CreateMultipartUploadCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType
  });
  const { UploadId } = await s3.send(command);
  const sessionId = uuidv4();
  await redis.hmset(sessionId, {
    uploadId: UploadId,
    key,
    status: 'initiated'
  });
  return { sessionId, uploadId: UploadId, key };
}

async function getUploadUrl({ sessionId, partNumber }) {
  const session = await redis.hgetall(sessionId);
  if (!session.uploadId) {
    throw new Error('Invalid session');
  }
  const command = new UploadPartCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: session.key,
    UploadId: session.uploadId,
    PartNumber: partNumber
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return { url };
}

async function completeUpload({ sessionId, parts }) {
  const session = await redis.hgetall(sessionId);
  if (!session.uploadId) {
    throw new Error('Invalid session');
  }
  const command = new CompleteMultipartUploadCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: session.key,
    UploadId: session.uploadId,
    MultipartUpload: { Parts: parts }
  });
  await s3.send(command);
  await redis.hset(sessionId, 'status', 'completed');
  return { key: session.key };
}

async function abortUpload({ sessionId }) {
  const session = await redis.hgetall(sessionId);
  if (!session.uploadId) {
    throw new Error('Invalid session');
  }
  const command = new AbortMultipartUploadCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: session.key,
    UploadId: session.uploadId
  });
  await s3.send(command);
  await redis.hset(sessionId, 'status', 'aborted');
}

module.exports = {
  initiateUpload,
  getUploadUrl,
  completeUpload,
  abortUpload
};
