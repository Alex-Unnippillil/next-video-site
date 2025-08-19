import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
  UpdateTimeToLiveCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

async function ensureTable(params) {
  try {
    await client.send(new DescribeTableCommand({ TableName: params.TableName }));
    console.log(`Table ${params.TableName} already exists`);
  } catch (err) {
    if (err.name === "ResourceNotFoundException") {
      await client.send(new CreateTableCommand(params));
      console.log(`Created table ${params.TableName}`);
    } else {
      throw err;
    }
  }

  await client.send(
    new UpdateTimeToLiveCommand({
      TableName: params.TableName,
      TimeToLiveSpecification: {
        AttributeName: "expiresAt",
        Enabled: true,
      },
    })
  );
}

const tables = [
  {
    TableName: "stream_stats",
    AttributeDefinitions: [
      { AttributeName: "streamId", AttributeType: "S" },
      { AttributeName: "userId", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "streamId", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
    GlobalSecondaryIndexes: [
      {
        IndexName: "userId-index",
        KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  },
  {
    TableName: "upload_sessions",
    AttributeDefinitions: [
      { AttributeName: "sessionId", AttributeType: "S" },
      { AttributeName: "userId", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "sessionId", KeyType: "HASH" }],
    BillingMode: "PAY_PER_REQUEST",
    GlobalSecondaryIndexes: [
      {
        IndexName: "userId-index",
        KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
  },
];

for (const t of tables) {
  ensureTable(t).catch((err) => {
    console.error(`Failed to provision ${t.TableName}`, err);
  });
}
