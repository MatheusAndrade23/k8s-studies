import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers(): Array<{ email: string; name: string }> {
    return [
      {
        email: 'john-doe@email.com',
        name: 'John Doe',
      },
      {
        email: 'anna-doe@email.com',
        name: 'Anna Doe',
      },
    ];
  }
}
