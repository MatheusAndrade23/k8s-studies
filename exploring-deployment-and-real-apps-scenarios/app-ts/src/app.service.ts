import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.APP ?? 'APP env!';
  }

  getExample(): string {
    return process.env.API_KEY ?? 'Sem API KEY!';
  }
}
