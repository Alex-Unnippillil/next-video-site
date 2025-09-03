import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { listObjects, signObject } from "../lib/s3.js";

test("listObjects returns object keys", async () => {
  const send = mock.fn(async (command) => {
    assert.ok(command instanceof ListObjectsV2Command);
    return { Contents: [{ Key: "file1" }, { Key: "file2" }] };
  });

  const client = { send };
  const keys = await listObjects(client, "bucket");

  assert.deepStrictEqual(keys, ["file1", "file2"]);
  assert.strictEqual(send.mock.callCount(), 1);
});

test("signObject uses provided signer", async () => {
  const signed = "https://example.com/signed";
  const signer = mock.fn(async () => signed);

  const client = {};
  const url = await signObject(client, "bucket", "key", 60, signer);

  assert.strictEqual(url, signed);
  assert.strictEqual(signer.mock.callCount(), 1);
  const [usedClient, command, options] = signer.mock.calls[0].arguments;
  assert.strictEqual(usedClient, client);
  assert.ok(command instanceof GetObjectCommand);
  assert.deepStrictEqual(command.input, { Bucket: "bucket", Key: "key" });
  assert.deepStrictEqual(options, { expiresIn: 60 });
});

