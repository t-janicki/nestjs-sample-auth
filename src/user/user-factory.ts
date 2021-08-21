import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { UserEntity } from './user.entity';
import { PasswordService } from '../auth/password.service';
import { RoleEntity } from './role.entity';

@Injectable()
export class UserFactory {
  constructor(private readonly passwordService: PasswordService) {}
  async create(
    registerUserDto: RegisterUserDto,
    roles: RoleEntity[],
  ): Promise<UserEntity> {
    return {
      firstName: registerUserDto.firstName,
      lastName: registerUserDto.lastName,
      email: registerUserDto.email,
      isActive: false,
      password: await this.passwordService.encodePassword(
        registerUserDto.password,
      ),
      createdAt: new Date(),
      roles: roles,
    };
  }
}
