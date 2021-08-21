import { EntityRepository, Repository } from 'typeorm';
import { UserDeviceEntity } from './user-device.entity';

@EntityRepository(UserDeviceEntity)
export class UserDeviceRepository extends Repository<UserDeviceEntity> {}
