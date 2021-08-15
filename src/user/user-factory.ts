import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { UserEntity } from './user.entity';
import { PasswordService } from '../auth/password.service';
import { Role } from '../auth/role.enum';

@Injectable()
export class UserFactory {
  constructor(private readonly passwordService: PasswordService) {}
  async create(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return {
      firstName: registerUserDto.firstName,
      lastName: registerUserDto.lastName,
      email: registerUserDto.email,
      isActive: false,
      password: await this.passwordService.encodePassword(
        registerUserDto.password,
      ),
      // roles: [Role.USER],
    };
  }
}
