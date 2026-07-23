import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): string {
    console.log('Health checked');
    return 'OK - v2';
  }

  checkReady(): string {
    console.log('Readiness checked');
    return 'OK - v2';
  }
}
