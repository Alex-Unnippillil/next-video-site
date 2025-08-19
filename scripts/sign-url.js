#!/usr/bin/env node
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import fs from "fs";

if (process.argv.length < 3) {
  console.error("Usage: node sign-url.js <URL> [expiresInSeconds]");
  process.exit(1);
}

const url = process.argv[2];
const expiresIn = parseInt(process.argv[3] || "3600", 10);

const keyPairId = process.env.CF_KEY_PAIR_ID;
const privateKeyPath = process.env.CF_PRIVATE_KEY_PATH;

if (!keyPairId || !privateKeyPath) {
  console.error(
    "CF_KEY_PAIR_ID and CF_PRIVATE_KEY_PATH environment variables must be set."
  );
  process.exit(1);
}

const privateKey = fs.readFileSync(privateKeyPath, "utf8");

const signedUrl = getSignedUrl({
  url,
  keyPairId,
  dateLessThan: new Date(Date.now() + expiresIn * 1000),
  privateKey,
});

console.log(signedUrl);
