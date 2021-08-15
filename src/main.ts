import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { UserDeviceGuard } from './auth/user-device.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalGuards(
    new JwtAuthGuard(new Reflector()),
    new UserDeviceGuard(new Reflector()),
  );
  await app.setGlobalPrefix('api');
  await app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
