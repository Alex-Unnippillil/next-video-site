# next-video-site

Utilities for sending application emails via Amazon SES triggered by Amazon SNS events.

## Email Templates

Templates for welcome, password reset, and transcoding-complete emails are defined in `src/templates`.
Run the following to register them with SES:

```bash
npm run register-templates
```

## Sending Emails

Publish events to an SNS topic using helpers in `src/publishers.js`.
An AWS Lambda subscribed to that topic should use `src/handlers/emailEventHandler.js`
to send the corresponding templated email through SES.

Set the following environment variables before running scripts:
- `AWS_REGION` – AWS region for SES/SNS
- `SES_SOURCE_EMAIL` – verified SES sender address

## Testing

No automated tests are provided yet; run `npm test` to verify the setup.
