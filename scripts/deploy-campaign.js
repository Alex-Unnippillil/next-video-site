#!/usr/bin/env node

const {
  PersonalizeClient,
  CreateSolutionCommand,
  CreateSolutionVersionCommand,
  CreateCampaignCommand
} = require("@aws-sdk/client-personalize");

const region = process.env.AWS_REGION;
const datasetGroupArn = process.env.PERSONALIZE_DATASET_GROUP_ARN;
const client = new PersonalizeClient({ region });

async function main() {
  const campaignName = process.argv[2] || "video-site-campaign";

  try {
    const solutionRes = await client.send(
      new CreateSolutionCommand({
        name: `${campaignName}-solution`,
        datasetGroupArn,
        recipeArn: "arn:aws:personalize:::recipe/aws-user-personalization"
      })
    );
    console.log("SolutionArn:", solutionRes.solutionArn);

    const versionRes = await client.send(
      new CreateSolutionVersionCommand({ solutionArn: solutionRes.solutionArn })
    );
    console.log("SolutionVersionArn:", versionRes.solutionVersionArn);

    const campaignRes = await client.send(
      new CreateCampaignCommand({
        name: campaignName,
        solutionVersionArn: versionRes.solutionVersionArn,
        minProvisionedTPS: 1
      })
    );
    console.log("CampaignArn:", campaignRes.campaignArn);
  } catch (err) {
    console.error("Error deploying campaign", err);
    process.exit(1);
  }
}

main();
