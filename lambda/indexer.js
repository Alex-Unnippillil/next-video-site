import { Client } from "@opensearch-project/opensearch";

const client = new Client({ node: process.env.OPENSEARCH_URL });

export const handler = async (event) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body);
    const { type, id, document } = body;
    const index = type === "creator" ? "creators" : "videos";
    await client.index({
      index,
      id,
      body: document
    });
  }
  return { statusCode: 200 };
};
