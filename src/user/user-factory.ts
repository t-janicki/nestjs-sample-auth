import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register-user.dto';
import { User } from './user.entity';
import { PasswordService } from '../auth/password.service';

@Injectable()
export class UserFactory {
  constructor(private readonly passwordService: PasswordService) {}
  async create(registerUserDto: RegisterUserDto): Promise<User> {
    return {
      email: registerUserDto.email,
      isActive: false,
      password: await this.passwordService.encodePassword(
        registerUserDto.password,
      ),
    };
  }
}
