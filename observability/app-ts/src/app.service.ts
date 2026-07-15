import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
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
}
