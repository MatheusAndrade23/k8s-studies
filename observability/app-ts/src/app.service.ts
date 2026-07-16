import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { metrics } from './tracer';

@Injectable()
export class AppService {
  getHello(): string {
    const metric = metrics.getMeter('app-ts');
    const successMetric = metric.createCounter('hello-success');
    successMetric.add(1);
    return process.env.APP ?? 'APP env!';
  }

  getExample(): string {
    const file = createWriteStream('kubernetes.txt');
    for (let i = 0; i <= 10000; i++) {
      file.write('Escrever no arquivo');
    }
    file.end();
    return process.env.API_KEY ?? 'Sem API KEY!';
  }

  getMetricTest() {
    const metric = metrics.getMeter('app-ts');
    const errorMetric = metric.createCounter('hello_error');
    errorMetric.add(1);
    const histogram = metric.createHistogram('request_duration');
    histogram.record(1000);
    return 'Métrica Acionada';
  }
}
