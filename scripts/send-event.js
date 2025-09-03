import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const {
  S3_BUCKET,
  AWS_REGION,
  S3_ENDPOINT,
  WEB_READ_PREFIX = "events/",
  SIGN_TTL_SECONDS = "1800",
} = process.env;

if (!S3_BUCKET || !AWS_REGION) {
  console.error("S3_BUCKET and AWS_REGION must be set in the environment");
  process.exit(1);
}

const s3 = new S3Client({
  region: AWS_REGION,
  ...(S3_ENDPOINT ? { endpoint: S3_ENDPOINT, forcePathStyle: true } : {}),
});

function parseArgs() {
  const args = {};
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = process.argv[i + 1];
      args[key] = value;
      i++;
    }
  }
  return args;
}

async function main() {
  const { user, item, eventType } = parseArgs();
  if (!user || !item || !eventType) {
    console.log(
      "Usage: node scripts/send-event.js --user USER_ID --item ITEM_ID --eventType EVENT_TYPE"
    );
    process.exit(1);
  }

  const event = {
    userId: user,
    itemId: item,
    eventType,
    timestamp: Date.now(),
  };

  const key = `${WEB_READ_PREFIX}${randomUUID()}.json`;

  await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: JSON.stringify(event),
      ContentType: "application/json",
    })
  );

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }),
    { expiresIn: Number(SIGN_TTL_SECONDS) }
  );

  console.log(`Stored event at s3://${S3_BUCKET}/${key}`);
  console.log(`Signed URL (valid for ${SIGN_TTL_SECONDS}s): ${url}`);
}

main().catch((err) => {
  console.error("Error sending event", err);
  process.exit(1);
});
