jest.mock('../src/redisClient', () => {
  const RedisMock = require('ioredis-mock');
  return new RedisMock();
});

jest.mock('@aws-sdk/client-s3', () => {
  const mSend = jest.fn();
  return {
    S3Client: jest.fn(() => ({ send: mSend })),
    CreateMultipartUploadCommand: jest.fn(),
    UploadPartCommand: jest.fn(),
    CompleteMultipartUploadCommand: jest.fn(),
    AbortMultipartUploadCommand: jest.fn(),
    __mSend: mSend
  };
});

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(() => Promise.resolve('https://example.com'))
}));

const { initiateUpload } = require('../src/uploadService');
const redis = require('../src/redisClient');
const { __mSend } = require('@aws-sdk/client-s3');

describe('uploadService', () => {
  beforeEach(() => {
    __mSend.mockReset();
    if (redis.flushall) redis.flushall();
  });

  test('rejects invalid type and size', async () => {
    await expect(initiateUpload({ fileName: 'a', fileType: 'text/plain', fileSize: 1 }))
      .rejects.toThrow('Invalid file type');
    await expect(initiateUpload({ fileName: 'a', fileType: 'video/mp4', fileSize: 200 * 1024 * 1024 }))
      .rejects.toThrow('File too large');
  });

  test('stores session in redis', async () => {
    __mSend.mockResolvedValueOnce({ UploadId: '123' });
    const res = await initiateUpload({ fileName: 'a.mp4', fileType: 'video/mp4', fileSize: 10 });
    const stored = await redis.hgetall(res.sessionId);
    expect(stored.uploadId).toBe('123');
  });
});
