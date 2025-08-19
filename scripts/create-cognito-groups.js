const { CognitoIdentityProviderClient, CreateGroupCommand } = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
const userPoolId = process.env.COGNITO_USER_POOL_ID;
const groups = ["Admin", "Creator", "Viewer"];

async function createGroups() {
  for (const GroupName of groups) {
    try {
      await client.send(new CreateGroupCommand({ GroupName, UserPoolId: userPoolId }));
      console.log(`Created group ${GroupName}`);
    } catch (err) {
      if (err.name === "GroupExistsException") {
        console.log(`Group ${GroupName} already exists`);
      } else {
        console.error(`Failed to create group ${GroupName}:`, err.message);
      }
    }
  }
}

if (!userPoolId) {
  console.error("COGNITO_USER_POOL_ID environment variable is required");
  process.exit(1);
}

createGroups();
