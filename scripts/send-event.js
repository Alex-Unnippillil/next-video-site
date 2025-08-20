const { PersonalizeEventsClient, PutEventsCommand } = require("@aws-sdk/client-personalize-events");

const client = new PersonalizeEventsClient({ region: process.env.AWS_REGION });
const trackingId = process.env.PERSONALIZE_TRACKING_ID;

async function sendEvent(userId, itemId, eventType) {
  if (!trackingId) {
    throw new Error("PERSONALIZE_TRACKING_ID environment variable is not set");
  }
  const input = {
    trackingId,
    userId,
    sessionId: userId,
    eventList: [
      {
        eventType,
        itemId,
        sentAt: new Date(),
      },
    ],
  };
  const command = new PutEventsCommand(input);
  const response = await client.send(command);
  return response;
}

if (require.main === module) {
  const [userId, itemId, eventType] = process.argv.slice(2);
  if (!userId || !itemId || !eventType) {
    console.log("Usage: node scripts/send-event.js <userId> <itemId> <eventType>");
    process.exit(1);
  }

  sendEvent(userId, itemId, eventType)
    .then((res) => {
      console.log(`Response HTTP status: ${res.$metadata?.httpStatusCode}`);
    })
    .catch((err) => {
      console.error("Failed to send event:", err);
      process.exit(1);
    });
}

module.exports = { sendEvent };
