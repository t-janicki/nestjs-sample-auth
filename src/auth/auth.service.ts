import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { LoginDto } from './login.dto';
import { Role } from './role.enum';
import { JwtPayload } from './jwt-payload';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async authenticateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.getByEmail(loginDto.email);
    if (
      user &&
      (await this.passwordService.matchesPassword(
        loginDto.password,
        user.password,
      ))
    ) {
      return this.login(user);
    }
    throw new BadRequestException('Incorrect username or password.');
  }

  async login(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      userId: user.id,
      roles: [Role.User], // todo roles table
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
