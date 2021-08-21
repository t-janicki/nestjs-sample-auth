import { Role } from './role.enum';

export class AuthenticationResponseDto {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  roles: Role[];
}
