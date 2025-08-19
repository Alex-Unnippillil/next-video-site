# next-video-site

Infrastructure and helpers for KMS-based encryption.

## KMS key

`infra/kms-key.yml` provisions a customer managed key with a restrictive key policy and annual rotation.

## Envelope encryption helpers

`lib/envelope.js` exposes `encryptWithKms` and `decryptWithKms` functions that perform envelope encryption using the KMS key.
