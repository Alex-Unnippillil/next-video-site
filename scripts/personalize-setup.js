import {
  PersonalizeClient,
  CreateSchemaCommand,
  CreateDatasetGroupCommand,
  CreateDatasetCommand,
  CreateDatasetImportJobCommand,
  CreateSolutionCommand
} from "@aws-sdk/client-personalize";

const client = new PersonalizeClient({});

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

async function createSchema() {
  const schema = {
    type: "record",
    name: "Interactions",
    namespace: "com.amazonaws.personalize.schema",
    fields: [
      { name: "USER_ID", type: "string" },
      { name: "ITEM_ID", type: "string" },
      { name: "EVENT_TYPE", type: "string" },
      { name: "TIMESTAMP", type: "long" }
    ],
    version: "1.0"
  };

  const command = new CreateSchemaCommand({
    name: `video-interactions-schema-${Date.now()}`,
    schema: JSON.stringify(schema)
  });

  const { schemaArn } = await client.send(command);
  return schemaArn;
}

async function createDatasetGroup() {
  const command = new CreateDatasetGroupCommand({
    name: `video-dataset-group-${Date.now()}`
  });

  const { datasetGroupArn } = await client.send(command);
  return datasetGroupArn;
}

async function createDataset(datasetGroupArn, schemaArn, datasetLocation) {
  const command = new CreateDatasetCommand({
    name: `video-interactions-dataset-${Date.now()}`,
    datasetType: "INTERACTIONS",
    schemaArn,
    datasetGroupArn
  });

  const { datasetArn } = await client.send(command);

  const importCommand = new CreateDatasetImportJobCommand({
    jobName: `video-import-job-${Date.now()}`,
    datasetArn,
    dataSource: { dataLocation: datasetLocation },
    roleArn: process.env.PERSONALIZE_ROLE_ARN
  });

  const { datasetImportJobArn } = await client.send(importCommand);
  console.log(`Dataset import job ARN: ${datasetImportJobArn}`);

  return datasetArn;
}

async function createSolution(datasetGroupArn, solutionName) {
  const command = new CreateSolutionCommand({
    name: solutionName,
    datasetGroupArn,
    recipeArn: "arn:aws:personalize:::recipe/aws-video-on-demand"
  });

  const { solutionArn } = await client.send(command);
  return solutionArn;
}

async function main() {
  const { dataset, solution } = parseArgs();
  if (!dataset || !solution) {
    console.log(
      "Usage: node scripts/personalize-setup.js --dataset s3://bucket/path.json --solution my-solution"
    );
    process.exit(1);
  }

  const schemaArn = await createSchema();
  console.log(`Schema ARN: ${schemaArn}`);

  const datasetGroupArn = await createDatasetGroup();
  console.log(`Dataset group ARN: ${datasetGroupArn}`);

  const datasetArn = await createDataset(datasetGroupArn, schemaArn, dataset);
  console.log(`Dataset ARN: ${datasetArn}`);

  const solutionArn = await createSolution(datasetGroupArn, solution);
  console.log(`Solution ARN: ${solutionArn}`);
}

main().catch((err) => {
  console.error("Error creating Personalize resources", err);
  process.exit(1);
});
