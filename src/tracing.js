const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { ParentBasedSampler, TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');
const AWSXRay = require('aws-xray-sdk');
const path = require('path');

// Configure AWS X-Ray sampling rules
const samplingRules = require(path.join(__dirname, '../xray-sampling-rules.json'));
AWSXRay.middleware.setSamplingRules(samplingRules);

// Configure OpenTelemetry SDK with a trace exporter and sampler
const traceExporter = new OTLPTraceExporter();
const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  sampler: new ParentBasedSampler({
    root: new TraceIdRatioBasedSampler(Number(process.env.OTEL_SAMPLE_RATE) || 1.0)
  })
});

sdk.start();

module.exports = { AWSXRay };
