const { SecretsManagerClient, CreateSecretCommand, PutSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

async function putSecret(name, value) {
  const client = new SecretsManagerClient({ region: process.env.AWS_REGION || 'us-east-1' });
  const string = JSON.stringify(value);
  try {
    await client.send(new CreateSecretCommand({ Name: name, SecretString: string }));
  } catch (err) {
    if (err.name === 'ResourceExistsException') {
      await client.send(new PutSecretValueCommand({ SecretId: name, SecretString: string }));
    } else {
      throw err;
    }
  }
}

(async () => {
  const name = process.argv[2];
  const value = JSON.parse(process.argv[3] || '{}');
  await putSecret(name, value);
})();
