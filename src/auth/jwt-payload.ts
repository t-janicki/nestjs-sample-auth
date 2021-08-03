import { Role } from './role.enum';

export interface JwtPayload {
  userId: string;
  email: string;
  roles: Role[];
}
