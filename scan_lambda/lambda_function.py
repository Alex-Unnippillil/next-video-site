import os
import json
import subprocess
import tempfile
import mimetypes
from datetime import datetime

import boto3

s3 = boto3.client('s3')
sns = boto3.client('sns')
dynamodb = boto3.resource('dynamodb')

QUARANTINE_BUCKET = os.environ.get('QUARANTINE_BUCKET', 'STLS-quarantine')
SNS_TOPIC_ARN = os.environ.get('SNS_TOPIC_ARN')
DDB_TABLE = os.environ.get('DDB_TABLE')

def clamav_scan(path: str) -> bool:
    """Run ClamAV on the given file. Returns True if infected."""
    try:
        result = subprocess.run(
            ['clamscan', path],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            check=False,
            text=True,
        )
    except FileNotFoundError:
        # In Lambda the clamscan binary must be provided in the deployment package.
        # If it's missing we treat the file as suspicious.
        return True
    return 'FOUND' in result.stdout

def sniff_media(path: str) -> str | None:
    """Best-effort media type sniffing based on file header."""
    with open(path, 'rb') as fh:
        header = fh.read(12)
    if header.startswith(b'\xFF\xD8\xFF'):
        return 'image/jpeg'
    if header.startswith(b'\x89PNG'):
        return 'image/png'
    if header[4:8] == b'ftyp':
        return 'video/mp4'
    return None

def lambda_handler(event, context):
    # Event from S3:ObjectCreated
    for record in event.get('Records', []):
        src_bucket = record['s3']['bucket']['name']
        src_key = record['s3']['object']['key']

        with tempfile.NamedTemporaryFile() as tmp:
            s3.download_file(src_bucket, src_key, tmp.name)

            infected = clamav_scan(tmp.name)
            media_type = sniff_media(tmp.name)

            suspicious = infected or not media_type
            if suspicious:
                dest_key = src_key
                s3.copy_object(
                    Bucket=QUARANTINE_BUCKET,
                    CopySource={'Bucket': src_bucket, 'Key': src_key},
                    Key=dest_key,
                )
                s3.delete_object(Bucket=src_bucket, Key=src_key)
                if SNS_TOPIC_ARN:
                    sns.publish(
                        TopicArn=SNS_TOPIC_ARN,
                        Subject='Quarantined file',
                        Message=f'File {src_key} from {src_bucket} quarantined. Infected={infected}, media={media_type}',
                    )

            if DDB_TABLE:
                table = dynamodb.Table(DDB_TABLE)
                table.put_item(
                    Item={
                        's3_object': f'{src_bucket}/{src_key}',
                        'timestamp': datetime.utcnow().isoformat(),
                        'infected': infected,
                        'media_type': media_type,
                        'quarantined': suspicious,
                    }
                )
    return {'status': 'ok'}
