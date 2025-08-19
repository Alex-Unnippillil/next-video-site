# next-video-site

This project demonstrates provisioning an [Amazon IVS](https://aws.amazon.com/ivs/) channel with low latency and an S3 recording configuration. It also exposes an API for retrieving the channel playback URL and storing stream sessions in a local SQLite database.

## Setup

Install dependencies:

```bash
npm install
```

Set the required environment variables when provisioning:

- `AWS_REGION` – AWS region (defaults to `us-east-1`)
- `S3_BUCKET_NAME` – S3 bucket used for recordings
- Standard AWS credentials variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)

## Provision a Channel

```bash
npm run provision
```

The script creates a recording configuration targeting the S3 bucket and then provisions a low-latency channel using that configuration. It stores the channel ARN and playback URL in `data.db`.

## API Server

Start the server:

```bash
npm start
```

### `GET /playback/:channelArn`

Returns the playback URL for the specified channel.

### `POST /sessions`

Stores a stream session in the database. Provide `channelArn` and `startedAt` fields in the request body.

## Testing

The project does not include automated tests yet. Running `npm test` prints a placeholder message.
