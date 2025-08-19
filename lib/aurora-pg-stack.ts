import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class AuroraPgStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // VPC for the database
    const vpc = new ec2.Vpc(this, 'DatabaseVpc', {
      maxAzs: 2,
    });

    // Generate a secret for database credentials
    const credentialsSecret = new secretsmanager.Secret(this, 'AuroraPgSecret', {
      secretName: 'auroraPgCredentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'dbadmin' }),
        generateStringKey: 'password',
        excludePunctuation: true,
      },
    });

    // Create the Aurora PostgreSQL Serverless v2 cluster
    new rds.DatabaseCluster(this, 'AuroraCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_14_6,
      }),
      writer: rds.ClusterInstance.serverlessV2('writer', {
        enablePerformanceInsights: true,
      }),
      serverlessV2MinCapacity: 0.5,
      serverlessV2MaxCapacity: 2,
      credentials: rds.Credentials.fromSecret(credentialsSecret),
      defaultDatabaseName: 'appdb',
      iamAuthentication: true,
      storageEncrypted: true,
      backup: {
        retention: Duration.days(7),
      },
      vpc,
    });
  }
}
