import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

// CloudWatch client; region inferred from environment
const cw = new CloudWatchClient({});
const Namespace = "NextVideoSite";

async function putMetric(MetricName, Value, Unit = "Count", Dimensions = []) {
  const params = {
    Namespace,
    MetricData: [
      {
        MetricName,
        Value,
        Unit,
        Dimensions,
      },
    ],
  };
  await cw.send(new PutMetricDataCommand(params));
}

export async function recordStartupTime(ms, dimensions = []) {
  return putMetric("StartupTime", ms, "Milliseconds", dimensions);
}

export async function recordApiLatency(apiName, ms, dimensions = []) {
  const dims = [{ Name: "ApiName", Value: apiName }, ...dimensions];
  return putMetric("ApiLatency", ms, "Milliseconds", dims);
}

export async function recordPlayerError(errorCode, dimensions = []) {
  const dims = [{ Name: "ErrorCode", Value: errorCode.toString() }, ...dimensions];
  return putMetric("PlayerErrors", 1, "Count", dims);
}

export async function recordRebufferEvent(ms, dimensions = []) {
  return putMetric("RebufferDuration", ms, "Milliseconds", dimensions);
}

export default {
  recordStartupTime,
  recordApiLatency,
  recordPlayerError,
  recordRebufferEvent,
};
