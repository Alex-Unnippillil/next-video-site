#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NextVideoSiteStack } from '../lib/next-video-site-stack';

const app = new cdk.App();
new NextVideoSiteStack(app, 'NextVideoSiteStack', {});
