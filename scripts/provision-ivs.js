import { IvsClient, CreateChannelCommand, CreateRecordingConfigurationCommand } from '@aws-sdk/client-ivs';
import { saveChannel } from '../lib/db.js';

const region = process.env.AWS_REGION || 'us-east-1';
const bucketName = process.env.S3_BUCKET_NAME;

if (!bucketName) {
  console.error('S3_BUCKET_NAME environment variable is required');
  process.exit(1);
}

const client = new IvsClient({ region });

async function provision() {
  const recording = await client.send(
    new CreateRecordingConfigurationCommand({
      name: `rec-${Date.now()}`,
      destinationConfiguration: { s3: { bucketName } },
    })
  );

  const channel = await client.send(
    new CreateChannelCommand({
      name: `channel-${Date.now()}`,
      type: 'BASIC',
      latencyMode: 'LOW',
      recordingConfigurationArn: recording.recordingConfiguration?.arn,
    })
  );

  const channelArn = channel.channel?.arn;
  const playbackUrl = channel.channel?.playbackUrl;

  if (channelArn && playbackUrl) {
    await saveChannel({ channelArn, playbackUrl });
  }

  console.log('Channel ARN:', channelArn);
  console.log('Playback URL:', playbackUrl);
}

provision().catch((err) => {
  console.error(err);
  process.exit(1);
});
