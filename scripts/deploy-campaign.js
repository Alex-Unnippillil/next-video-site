#!/usr/bin/env node

const {
  PersonalizeClient,
  CreateCampaignCommand,
  UpdateCampaignCommand,
  ListCampaignsCommand
} = require("@aws-sdk/client-personalize");

/**
 * Creates or updates a Personalize campaign using an existing solution version.
 * Required environment variables:
 *   - AWS_REGION
 *   - CAMPAIGN_NAME
 *   - SOLUTION_VERSION_ARN
 * Optional environment variable:
 *   - MIN_PROVISIONED_TPS (defaults to 1)
 */
async function deployCampaign() {
  const region = process.env.AWS_REGION;
  const campaignName = process.env.CAMPAIGN_NAME;
  const solutionVersionArn = process.env.SOLUTION_VERSION_ARN;
  const minProvisionedTPS = parseInt(process.env.MIN_PROVISIONED_TPS || "1", 10);

  if (!region || !campaignName || !solutionVersionArn) {
    throw new Error("AWS_REGION, CAMPAIGN_NAME, and SOLUTION_VERSION_ARN must be set");
  }

  const client = new PersonalizeClient({ region });

  // Check if the campaign already exists
  const { campaigns } = await client.send(new ListCampaignsCommand({}));
  const existing = campaigns?.find((c) => c.campaignName === campaignName);

  if (existing) {
    const updateParams = {
      campaignArn: existing.campaignArn,
      solutionVersionArn,
      minProvisionedTPS
    };
    await client.send(new UpdateCampaignCommand(updateParams));
    return { action: "updated", campaignArn: existing.campaignArn };
  }

  const createParams = {
    campaignName,
    solutionVersionArn,
    minProvisionedTPS
  };
  const { campaignArn } = await client.send(new CreateCampaignCommand(createParams));
  return { action: "created", campaignArn };
}

if (require.main === module) {
  deployCampaign()
    .then((result) => {
      console.log(`Campaign ${result.action}: ${result.campaignArn}`);
    })
    .catch((err) => {
      console.error("Failed to deploy campaign:", err);
      process.exit(1);
    });
}

module.exports = { deployCampaign };

