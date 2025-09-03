import { S3Client, PutBucketLifecycleConfigurationCommand } from "@aws-sdk/client-s3";

const client = new S3Client({});

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
  const { bucket } = parseArgs();
  if (!bucket) {
    console.log(
      "Usage: node scripts/add-events-lifecycle.js --bucket my-bucket"
    );
    process.exit(1);
  }

  const rule = {
    ID: "RemoveEventsAfter30Days",
    Filter: { Prefix: "events/" },
    Status: "Enabled",
    Expiration: { Days: 30 }
  };

  const command = new PutBucketLifecycleConfigurationCommand({
    Bucket: bucket,
    LifecycleConfiguration: { Rules: [rule] }
  });

  await client.send(command);
  console.log(
    `Added lifecycle rule to ${bucket} to remove events/* after 30 days`
  );
}

main().catch((err) => {
  console.error("Error adding lifecycle rule", err);
  process.exit(1);
});
