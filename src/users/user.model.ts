import { Role } from '../auth/role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  roles: Role[];
}
