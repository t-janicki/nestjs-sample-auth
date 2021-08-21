import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { Role } from '../auth/role.enum';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}
  getRolesByName(roleName: Role): Promise<RoleEntity[]> {
    return this.roleRepository.find({
      name: roleName,
    });
  }
}
