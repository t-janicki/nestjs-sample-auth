import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Role } from '../auth/role.enum';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '9e959dd4-084c-45bb-9300-53eb917e73ba',
      username: 'john',
      password: 'changeme',
      roles: [Role.User],
    },
    {
      id: 'd35ccb53-1298-4dc3-9bcf-63d5d8561443',
      username: 'maria',
      password: 'guess',
      roles: [Role.Admin],
    },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
