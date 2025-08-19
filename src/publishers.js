const { PublishCommand } = require('@aws-sdk/client-sns');
const { snsClient } = require('./aws/snsClient');

async function publishEmailEvent(topicArn, type, toAddress, data) {
  const message = JSON.stringify({ type, toAddress, data });
  const command = new PublishCommand({ TopicArn: topicArn, Message: message });
  await snsClient.send(command);
}

module.exports = {
  publishWelcomeEvent: (topicArn, toAddress, data) =>
    publishEmailEvent(topicArn, 'WELCOME', toAddress, data),
  publishPasswordResetEvent: (topicArn, toAddress, data) =>
    publishEmailEvent(topicArn, 'PASSWORD_RESET', toAddress, data),
  publishTranscodingCompleteEvent: (topicArn, toAddress, data) =>
    publishEmailEvent(topicArn, 'TRANSCODING_COMPLETE', toAddress, data),
};
