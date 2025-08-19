const { KMSClient, GenerateDataKeyCommand, DecryptCommand } = require("@aws-sdk/client-kms");
const crypto = require("crypto");

const kms = new KMSClient({});

async function encryptWithKms(keyId, plainText) {
  const dataKey = await kms.send(new GenerateDataKeyCommand({
    KeyId: keyId,
    KeySpec: "AES_256"
  }));

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", dataKey.Plaintext, iv);

  const cipherText = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    cipherText: cipherText.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    encryptedKey: Buffer.from(dataKey.CiphertextBlob).toString("base64")
  };
}

async function decryptWithKms(keyId, envelope) {
  const { cipherText, iv, authTag, encryptedKey } = envelope;

  const decryptedKey = await kms.send(new DecryptCommand({
    KeyId: keyId,
    CiphertextBlob: Buffer.from(encryptedKey, "base64")
  }));

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    decryptedKey.Plaintext,
    Buffer.from(iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  const plainText = Buffer.concat([
    decipher.update(Buffer.from(cipherText, "base64")),
    decipher.final()
  ]);
  return plainText.toString("utf8");
}

module.exports = { encryptWithKms, decryptWithKms };
