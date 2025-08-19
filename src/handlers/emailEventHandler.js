const { sendTemplatedEmail } = require('../email/sendEmail');

const TEMPLATE_MAP = {
  WELCOME: 'WelcomeTemplate',
  PASSWORD_RESET: 'PasswordResetTemplate',
  TRANSCODING_COMPLETE: 'TranscodingCompleteTemplate',
};

/**
 * AWS Lambda handler for SNS events.
 * Expects SNS message: { type, toAddress, data }
 */
async function handleEmailEvent(event) {
  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);
    const templateName = TEMPLATE_MAP[message.type];
    if (!templateName) {
      console.warn(`Unknown email type: ${message.type}`);
      continue;
    }

    await sendTemplatedEmail({
      toAddress: message.toAddress,
      templateName,
      templateData: message.data || {},
    });
  }
}

module.exports = { handleEmailEvent };
