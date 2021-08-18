import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { Repository } from 'typeorm';
import { UserDeviceEntity } from '../user-device/user-device.entity';
import { DeviceType } from '../user-device/device-type.enum';
import { randomUUID } from 'crypto';
import { addSeconds } from 'date-fns';
import { UserEntity } from '../user/user.entity';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {}

  async registerRefreshToken(user: UserEntity) {
    const userDevice: UserDeviceEntity = {
      deviceType: DeviceType.BROWSER,
      user: user,
    };
    const refreshToken: RefreshTokenEntity = {
      token: randomUUID(),
      expiresAt: addSeconds(new Date(), jwtConstants.refreshTokenExpiresIn),
      device: userDevice,
    };
    return this.refreshTokenRepository.save(refreshToken);
  }
}
