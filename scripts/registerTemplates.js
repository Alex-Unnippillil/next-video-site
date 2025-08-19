const fs = require('fs');
const path = require('path');
const { CreateTemplateCommand } = require('@aws-sdk/client-ses');
const { sesClient } = require('../src/aws/sesClient');

async function registerTemplates() {
  const templatesDir = path.join(__dirname, '..', 'src', 'templates');
  const files = fs.readdirSync(templatesDir);

  for (const file of files) {
    const template = JSON.parse(fs.readFileSync(path.join(templatesDir, file), 'utf8'));
    const command = new CreateTemplateCommand({ Template: template });
    await sesClient.send(command);
    console.log(`Registered template: ${template.TemplateName}`);
  }
}

registerTemplates().catch(err => {
  console.error(err);
  process.exit(1);
});
