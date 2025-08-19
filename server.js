const express = require('express');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const sqs = new SQSClient({ region: process.env.AWS_REGION || 'us-east-1' });
const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
const queueUrl = process.env.SQS_QUEUE_URL || 'https://sqs.example.com/queue';
const emailSource = process.env.EMAIL_SOURCE || 'noreply@example.com';
const auditLogPath = path.join(__dirname, 'audit.log');

function recordAuditEvent(userId, action, details = {}) {
  const entry = { timestamp: new Date().toISOString(), userId, action, details };
  fs.appendFileSync(auditLogPath, JSON.stringify(entry) + '\n');
}

async function queueTask(type, payload) {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({ type, payload })
  });
  try {
    await sqs.send(command);
  } catch (err) {
    console.error('Failed to queue task', err);
  }
}

async function sendEmail(to, subject, body) {
  const command = new SendEmailCommand({
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: body } }
    },
    Source: emailSource
  });
  try {
    await ses.send(command);
  } catch (err) {
    console.error('Failed to send email', err);
  }
}

app.post('/account/delete', async (req, res) => {
  const { userId, email } = req.body;
  await queueTask('delete_account', { userId });
  await sendEmail(email, 'Account deletion requested', 'Your account deletion has been queued.');
  recordAuditEvent(userId, 'account_delete_requested');
  res.json({ status: 'queued' });
});

app.post('/account/export', async (req, res) => {
  const { userId, email } = req.body;
  await queueTask('data_export', { userId });
  await sendEmail(email, 'Data export requested', 'Your data export has been queued.');
  recordAuditEvent(userId, 'data_export_requested');
  res.json({ status: 'queued' });
});

app.post('/consent/logs', (req, res) => {
  const { userId, consent } = req.body;
  recordAuditEvent(userId, 'consent', { consent });
  res.json({ status: 'logged' });
});

app.get('/consent/logs/:userId', (req, res) => {
  try {
    const data = fs.existsSync(auditLogPath) ? fs.readFileSync(auditLogPath, 'utf8').trim().split('\n') : [];
    const logs = data
      .filter(Boolean)
      .map(line => JSON.parse(line))
      .filter(entry => entry.userId === req.params.userId && entry.action === 'consent');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read logs' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // for potential testing
