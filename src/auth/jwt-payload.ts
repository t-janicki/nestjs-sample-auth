import { Role } from './role.enum';

export interface JwtPayload {
  userId: string;
  deviceId: string;
  email: string;
  roles: Role[];
}
