import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // constructor(private moduleRef: ModuleRef) {
  //   super({
  //     passReqToCallback: true,
  //     usernameField: 'username',
  //     passwordField: 'password',
  //   });
  // }
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(request: Request): Promise<any> {
  //   const contextId = ContextIdFactory.getByRequest(request);
  //   const user = await this.moduleRef.resolve(AuthService, contextId);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
