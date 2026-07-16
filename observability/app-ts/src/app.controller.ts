import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/example-k8s')
  example(): string {
    return this.appService.getExample();
  }

  @Get('/metric-test')
  metricTest(): string {
    return this.appService.getMetricTest();
  }
}
