import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  DEVICE_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from './constants';
import { CookieOptions } from 'express-serve-static-core';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  path: '/',
  secure: true,
};

@Injectable()
export class CookieService {
  setDevice(response: Response, deviceId: string): Response {
    return response.cookie(DEVICE_COOKIE_KEY, deviceId, cookieOptions);
  }
  setAccessToken(response: Response, accessToken: string) {
    return response.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, cookieOptions);
  }
  setRefreshToken(response: Response, refreshToken: string) {
    return response.cookie(
      REFRESH_TOKEN_COOKIE_KEY,
      refreshToken,
      cookieOptions,
    );
  }
}
