import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Res } from '@nestjs/common';
import { ACCESS_TOKEN_COOKIE_KEY, jwtConstants } from './constants';
import { LoggedUser } from './logged-user.decorator';
import { JwtPayload } from './jwt-payload';
import { Request } from 'express';

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[ACCESS_TOKEN_COOKIE_KEY];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    return new LoggedUser(payload.userId, payload.email, payload.roles);
  }
}
