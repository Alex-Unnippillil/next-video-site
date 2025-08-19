const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function getSecret(secretName) {
  const client = new SecretsManagerClient({ region: process.env.AWS_REGION || 'us-east-1' });
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  return JSON.parse(response.SecretString);
}

async function start() {
  try {
    const dbCredentials = await getSecret(process.env.DB_SECRET_NAME);
    const apiSecrets = await getSecret(process.env.API_SECRET_NAME);

    console.log('Fetched secrets');
    console.log(`DB user: ${dbCredentials.username}`);
    console.log(`API key: ${apiSecrets.key ? 'loaded' : 'missing'}`);
  } catch (err) {
    console.error('Failed to fetch secrets', err);
    process.exit(1);
  }
}

start();
