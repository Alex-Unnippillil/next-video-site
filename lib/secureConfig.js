const fs = require('fs');
const path = require('path');

const cache = {};

function parseEnv(content) {
  const env = {};
  content.split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match) {
      env[match[1]] = match[2];
    }
  });
  return env;
}

function loadLocalEnv() {
  if (process.env.NODE_ENV === 'development') {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const file = fs.readFileSync(envPath, 'utf8');
      const parsed = parseEnv(file);
      Object.assign(process.env, parsed);
    }
  }
}

/**
 * Retrieve secure parameter from AWS SSM Parameter Store.
 * Results are cached in memory. In development the value falls back to
 * `.env.local` if the parameter is not available from SSM.
 *
 * @param {string} name Parameter name
 * @returns {Promise<string>} resolved parameter value
 */
async function getSecureParameter(name) {
  if (cache[name]) {
    return cache[name];
  }

  loadLocalEnv();

  if (process.env.NODE_ENV === 'development' && process.env[name]) {
    cache[name] = process.env[name];
    return cache[name];
  }

  const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
  const client = new SSMClient({});
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: true,
  });
  const response = await client.send(command);
  const value = response.Parameter && response.Parameter.Value;
  cache[name] = value;
  return value;
}

module.exports = { getSecureParameter };
