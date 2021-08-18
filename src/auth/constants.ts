import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: 3600, // 1h
  refreshTokenExpiresIn: 604800, // 1 week
};

export const ACCESS_TOKEN_COOKIE_KEY = 'accessToken';
export const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken';
export const DEVICE_COOKIE_KEY = 'device';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
