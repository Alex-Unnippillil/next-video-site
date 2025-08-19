#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { AuroraPgStack } from '../lib/aurora-pg-stack';

const app = new App();
new AuroraPgStack(app, 'AuroraPgStack');
