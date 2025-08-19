const { SecretsManagerClient, GetSecretValueCommand, PutSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { Client } = require('pg');

function generateRandomPassword(length = 32) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

exports.handler = async (event) => {
  const secretArn = event.SecretId || process.env.DB_SECRET_ARN;
  const region = process.env.AWS_REGION || 'us-east-1';
  const sm = new SecretsManagerClient({ region });

  const current = await sm.send(new GetSecretValueCommand({ SecretId: secretArn }));
  const secret = JSON.parse(current.SecretString);

  const newPassword = generateRandomPassword();
  const pg = new Client({
    host: secret.host,
    user: secret.username,
    password: secret.password,
    database: secret.dbname,
  });

  await pg.connect();
  await pg.query(`ALTER USER "${secret.username}" WITH PASSWORD '${newPassword}'`);
  await pg.end();

  secret.password = newPassword;
  await sm.send(
    new PutSecretValueCommand({ SecretId: secretArn, SecretString: JSON.stringify(secret) })
  );

  return { status: 'rotated' };
};
