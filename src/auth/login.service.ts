import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { LoginDto } from './login.dto';
import { AuthenticationResponseDto } from './authentication-response.dto';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { Response } from 'express';
import { CookieService } from './cookie.service';
import { RoleEntity } from '../user/role.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly cookieService: CookieService,
  ) {}
  async loginUser(
    loginDto: LoginDto,
    response: Response,
  ): Promise<AuthenticationResponseDto> {
    const deviceId = randomUUID();
    const user = await this.userService.getByEmailOrThrow(loginDto.email);
    const accessToken = await this.authService.authenticateUser(
      loginDto.password,
      user,
      deviceId,
    );
    const refreshToken = await this.refreshTokenService.registerRefreshToken(
      user,
      deviceId,
    );
    this.cookieService.setAccessToken(response, accessToken.token);
    this.cookieService.setRefreshToken(response, refreshToken.token);
    this.cookieService.setDevice(response, deviceId);
    return {
      accessToken: accessToken.token,
      expiresIn: jwtConstants.expiresIn,
      refreshToken: refreshToken.token,
      refreshTokenExpiresIn: jwtConstants.refreshTokenExpiresIn,
      roles: user.roles.map((role: RoleEntity) => role.name),
    };
  }
}
