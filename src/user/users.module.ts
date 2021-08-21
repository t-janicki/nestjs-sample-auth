import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { PasswordService } from '../auth/password.service';
import { UserFactory } from './user-factory';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      RoleRepository,
      UserRepository,
    ]),
  ],
  providers: [UsersService, PasswordService, UserFactory, RoleService],
  exports: [UsersService],
})
export class UsersModule {}
