const { SendTemplatedEmailCommand } = require('@aws-sdk/client-ses');
const { sesClient } = require('../aws/sesClient');

/**
 * Sends an email using an SES template.
 * @param {Object} params
 * @param {string} params.toAddress - Recipient email address.
 * @param {string} params.templateName - SES template name.
 * @param {Object} params.templateData - Data to fill the template.
 */
async function sendTemplatedEmail({ toAddress, templateName, templateData }) {
  const command = new SendTemplatedEmailCommand({
    Source: process.env.SES_SOURCE_EMAIL,
    Destination: { ToAddresses: [toAddress] },
    Template: templateName,
    TemplateData: JSON.stringify(templateData),
  });

  await sesClient.send(command);
}

module.exports = { sendTemplatedEmail };
