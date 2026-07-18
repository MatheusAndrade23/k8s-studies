import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import {
  diag,
  DiagConsoleLogger,
  DiagLogLevel,
  metrics,
} from '@opentelemetry/api';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';

const SERVICE_NAME = 'app-ts-2';

const metricsExporter = new OTLPMetricExporter({
  url: 'http://127.0.0.1:4317',
});
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricsExporter,
  exportIntervalMillis: 10000,
});

const traceExporter = new OTLPTraceExporter({
  url: 'http://127.0.0.1:4318/v1/traces',
});

const logExporter = new OTLPLogExporter({
  url: 'http://127.0.0.1:4318/v1/logs',
});

// export OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:4318

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: SERVICE_NAME,
  [ATTR_SERVICE_VERSION]: '2.0.0',
});

const mergedResource = resource;
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new NodeSDK({
  traceExporter,
  metricReaders: [metricReader],
  logRecordProcessors: [new BatchLogRecordProcessor({ exporter: logExporter })],
  instrumentations: [getNodeAutoInstrumentations()],
  resource: mergedResource,
  serviceName: SERVICE_NAME,
});

export { sdk, metrics };
