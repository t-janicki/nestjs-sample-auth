import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  DEVICE_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from './constants';

@Injectable()
export class CookieService {
  setDevice(response: Response, deviceId: string): Response {
    return response.cookie(DEVICE_COOKIE_KEY, deviceId, {
      httpOnly: true,
      path: '/',
      secure: true,
    });
  }
  setAccessToken(response: Response, accessToken: string) {
    return response.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
      httpOnly: true,
      path: '/',
      secure: true,
    });
  }
  setRefreshToken(response: Response, refreshToken: string) {
    return response.cookie(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
    });
  }
}
