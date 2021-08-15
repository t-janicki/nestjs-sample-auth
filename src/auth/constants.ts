import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'secretKey',
  expiresIn: '3600s', // 1h
};

export const ACCESS_TOKEN_COOKIE_KEY = 'accessToken';
export const DEVICE_COOKIE_KEY = 'device';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
