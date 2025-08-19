import express from "express";
import { Client } from "@opensearch-project/opensearch";

const app = express();
const port = process.env.PORT || 3000;
const client = new Client({ node: process.env.OPENSEARCH_URL });

app.get("/api/search", async (req, res) => {
  const { q, index = "videos" } = req.query;
  try {
    const result = await client.search({
      index,
      body: {
        query: {
          multi_match: {
            query: q,
            fields: ["title", "description", "name", "bio"]
          }
        }
      }
    });
    const hits = result.body.hits.hits.map(hit => ({ id: hit._id, ...hit._source }));
    res.json(hits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
