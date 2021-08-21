import { EntityRepository, Repository } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';

@EntityRepository(RefreshTokenEntity)
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {}
