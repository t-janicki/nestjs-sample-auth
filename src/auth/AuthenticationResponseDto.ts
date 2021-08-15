import { Role } from './role.enum';

export class AuthenticationResponseDto {
  accessToken: string;
  expiresIn: number;
  roles: Role[];
}
