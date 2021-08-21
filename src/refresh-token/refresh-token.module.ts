import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';
import { UserDeviceModule } from '../user-device/user-device.module';
import { UsersModule } from '../user/users.module';
import { RefreshTokenRepository } from './refresh-token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity, RefreshTokenRepository]),
    UserDeviceModule,
    UsersModule,
  ],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
