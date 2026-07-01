import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/healthz')
  healthZ(): string {
    return this.healthService.checkHealth();
  }

  @Get('/readyz')
  readyZ(): string {
    // pode user o terminus para testar as dependências externas
    return this.healthService.checkReady();
  }
}
