import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { Role } from '../auth/role.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  getRolesByName(roleName: Role): Promise<RoleEntity[]> {
    return this.roleRepository.find({
      name: roleName,
    });
  }
}
