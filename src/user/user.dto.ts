import { Role } from '../auth/role.enum';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  roles: Role[];
}
