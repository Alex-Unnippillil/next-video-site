const { SESClient } = require('@aws-sdk/client-ses');

// Shared SES client configured via environment region
const sesClient = new SESClient({ region: process.env.AWS_REGION });

module.exports = { sesClient };
