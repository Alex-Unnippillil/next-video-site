# next-video-site

This project demonstrates storing secrets in AWS Secrets Manager and retrieving them on application startup. It also includes a sample Lambda for rotating PostgreSQL credentials.

## Secrets

Use the helper script to create or update secrets:

```
node scripts/storeSecrets.js my-db-secret '{"username":"app","password":"old","host":"db.example.com","dbname":"app"}'
node scripts/storeSecrets.js my-api-secret '{"key":"super-secret"}'
```

Start the application with the secret names:

```
DB_SECRET_NAME=my-db-secret API_SECRET_NAME=my-api-secret npm start
```

## Rotation Lambda

Deploy `lambda/rotatePostgres.js` as an AWS Lambda with access to the database and Secrets Manager. The function generates a new password, updates the database user, and stores the new credentials back in Secrets Manager.
