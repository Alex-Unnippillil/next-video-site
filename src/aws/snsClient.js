const { SNSClient } = require('@aws-sdk/client-sns');

// Shared SNS client configured via environment region
const snsClient = new SNSClient({ region: process.env.AWS_REGION });

module.exports = { snsClient };
