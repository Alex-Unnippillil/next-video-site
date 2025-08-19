# next-video-site

## Upload API

`POST /api/upload-url`

Returns a pre-signed POST for uploading video files to the `STLS-vod-input` bucket. The request body must include `contentType` and `contentLength`.

* Only `video/*` content types are accepted.
* Maximum size is 500MB.
* Requester identity is logged from the `x-user-id` header and IP address.

See [`iam/stls-vod-input-upload-policy.json`](iam/stls-vod-input-upload-policy.json) for the minimal IAM policy needed to generate upload URLs.
