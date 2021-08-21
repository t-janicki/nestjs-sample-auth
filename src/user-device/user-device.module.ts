import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeviceEntity } from './user-device.entity';
import { UserDeviceService } from './user-device.service';
import { UserDeviceRepository } from './user-device.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserDeviceEntity, UserDeviceRepository])],
  providers: [UserDeviceService],
  exports: [UserDeviceService],
})
export class UserDeviceModule {}
