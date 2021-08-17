import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeviceEntity } from './user-device.entity';
import { UserDeviceService } from './user-device.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserDeviceEntity])],
  providers: [UserDeviceService],
  exports: [UserDeviceService],
})
export class UserDeviceModule {}
