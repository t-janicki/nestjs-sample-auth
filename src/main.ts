import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  await app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
}
bootstrap();
