import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PasswordService } from './password.service';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { UsersModule } from '../user/users.module';
import { LoginService } from './login.service';
import { CookieService } from './cookie.service';

@Module({
  imports: [
    UsersModule,
    RefreshTokenModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,
    LoginService,
    CookieService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [LoginService],
})
export class AuthModule {}
