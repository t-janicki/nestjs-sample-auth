import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { UserDeviceEntity } from '../user-device/user-device.entity';
import { DeviceType } from '../user-device/device-type.enum';
import { randomUUID } from 'crypto';
import { addSeconds } from 'date-fns';
import { UserEntity } from '../user/user.entity';
import { jwtConstants } from '../auth/constants';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async registerRefreshToken(user: UserEntity, deviceId: string) {
    const userDevice: UserDeviceEntity = {
      id: deviceId,
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
