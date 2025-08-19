#!/usr/bin/env node

const { PersonalizeEventsClient, PutEventsCommand } = require("@aws-sdk/client-personalize-events");

const region = process.env.AWS_REGION;
const trackingId = process.env.PERSONALIZE_TRACKING_ID;
const client = new PersonalizeEventsClient({ region });

async function main() {
  const [userId, itemId] = process.argv.slice(2);
  if (!userId || !itemId) {
    console.error("Usage: node send-event.js <userId> <itemId>");
    process.exit(1);
  }

  const command = new PutEventsCommand({
    trackingId,
    userId,
    sessionId: `${userId}-session`,
    eventList: [
      {
        eventType: "Watch",
        sentAt: new Date(),
        properties: JSON.stringify({ itemId })
      }
    ]
  });

  try {
    await client.send(command);
    console.log("Event sent");
  } catch (err) {
    console.error("Failed to send event", err);
    process.exit(1);
  }
}

main();
