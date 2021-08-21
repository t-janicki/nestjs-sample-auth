import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_COOKIE_KEY, DEVICE_COOKIE_KEY, IS_PUBLIC_KEY } from './constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserDeviceGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const device = request.cookies?.[DEVICE_COOKIE_KEY];
    const jwt = request.cookies?.[ACCESS_TOKEN_COOKIE_KEY];
    const user = request.user;
    // todo validate deviceId in jwt
    return true;
  }
}
