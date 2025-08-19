import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Shared DynamoDB Document client for SDK utilities
const client = new DynamoDBClient({});
export const docClient = DynamoDBDocumentClient.from(client);
