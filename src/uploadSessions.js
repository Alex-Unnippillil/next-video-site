import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "./dynamoClient.js";

const TABLE_NAME = "upload_sessions";
const USER_INDEX = "userId-index";

export async function putUploadSession(session) {
  await docClient.send(
    new PutCommand({ TableName: TABLE_NAME, Item: session })
  );
}

export async function getUploadSessionsByUser(userId) {
  const res = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: USER_INDEX,
      KeyConditionExpression: "userId = :u",
      ExpressionAttributeValues: { ":u": userId },
    })
  );
  return res.Items ?? [];
}
