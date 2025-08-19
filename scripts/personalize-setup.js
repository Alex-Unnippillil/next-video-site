#!/usr/bin/env node

const {
  PersonalizeClient,
  CreateDatasetGroupCommand,
  CreateSchemaCommand,
  CreateDatasetCommand,
  CreateEventTrackerCommand
} = require("@aws-sdk/client-personalize");

const region = process.env.AWS_REGION;
const client = new PersonalizeClient({ region });

async function main() {
  const datasetGroupName = process.argv[2] || "video-site";
  const schemaName = `${datasetGroupName}-schema`;
  const datasetName = `${datasetGroupName}-interactions`;

  try {
    const dg = await client.send(new CreateDatasetGroupCommand({ name: datasetGroupName }));
    console.log("DatasetGroupArn:", dg.datasetGroupArn);

    const schema = {
      type: "record",
      name: "Interactions",
      namespace: "com.amazonaws.personalize.schema",
      fields: [
        { name: "USER_ID", type: "string" },
        { name: "ITEM_ID", type: "string" },
        { name: "TIMESTAMP", type: "long" }
      ],
      version: "1.0"
    };

    const schemaRes = await client.send(new CreateSchemaCommand({
      name: schemaName,
      schema: JSON.stringify(schema)
    }));
    console.log("SchemaArn:", schemaRes.schemaArn);

    const datasetRes = await client.send(new CreateDatasetCommand({
      datasetGroupArn: dg.datasetGroupArn,
      datasetType: "INTERACTIONS",
      schemaArn: schemaRes.schemaArn,
      name: datasetName
    }));
    console.log("DatasetArn:", datasetRes.datasetArn);

    const trackerRes = await client.send(new CreateEventTrackerCommand({
      name: `${datasetGroupName}-tracker`,
      datasetGroupArn: dg.datasetGroupArn
    }));
    console.log("EventTrackerArn:", trackerRes.eventTrackerArn);
    console.log("TrackingId:", trackerRes.trackingId);
  } catch (err) {
    console.error("Error creating Personalize resources", err);
    process.exit(1);
  }
}

main();
