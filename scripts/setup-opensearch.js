import { OpenSearchClient, CreateDomainCommand } from "@aws-sdk/client-opensearch";
import { Client } from "@opensearch-project/opensearch";

const region = process.env.AWS_REGION || "us-east-1";
const domainName = process.env.OPENSEARCH_DOMAIN || "video-site";
const endpoint = process.env.OPENSEARCH_URL;

async function createDomain() {
  const client = new OpenSearchClient({ region });
  const cmd = new CreateDomainCommand({ DomainName: domainName });
  await client.send(cmd);
  console.log(`Domain ${domainName} created`);
}

async function createMappings() {
  const client = new Client({ node: endpoint });
  await client.indices.create({
    index: "videos",
    body: {
      mappings: {
        properties: {
          id: { type: "keyword" },
          title: { type: "text" },
          description: { type: "text" },
          creatorId: { type: "keyword" }
        }
      }
    }
  });
  await client.indices.create({
    index: "creators",
    body: {
      mappings: {
        properties: {
          id: { type: "keyword" },
          name: { type: "text" },
          bio: { type: "text" }
        }
      }
    }
  });
  console.log("Indexes created");
}

export async function setup() {
  await createDomain();
  await createMappings();
}

if (require.main === module) {
  setup().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
