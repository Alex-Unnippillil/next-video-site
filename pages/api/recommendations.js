const {
  PersonalizeRuntimeClient,
  GetRecommendationsCommand
} = require("@aws-sdk/client-personalize-runtime");

const client = new PersonalizeRuntimeClient({ region: process.env.AWS_REGION });

module.exports = async function handler(req, res) {
  const { userId } = req.query;
  if (!userId) {
    res.status(400).json({ error: "Missing userId" });
    return;
  }

  try {
    const command = new GetRecommendationsCommand({
      campaignArn: process.env.PERSONALIZE_CAMPAIGN_ARN,
      userId: String(userId)
    });
    const response = await client.send(command);
    res.status(200).json(response);
  } catch (err) {
    console.error("Failed to get recommendations", err);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};
