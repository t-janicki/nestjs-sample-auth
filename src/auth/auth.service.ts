import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { LoginDto } from './login.dto';
import { Role } from './role.enum';
import { JwtPayload } from './jwt-payload';
import { UserEntity } from '../user/user.entity';
import { jwtConstants } from './constants';
import { AuthenticationResponseDto } from './AuthenticationResponseDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async authenticateUser(
    loginDto: LoginDto,
  ): Promise<AuthenticationResponseDto> {
    const user = await this.usersService.getByEmailOrThrow(loginDto.email);
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

  async login(user: UserEntity): Promise<AuthenticationResponseDto> {
    const roles = [Role.USER];
    const payload: JwtPayload = {
      email: user.email,
      userId: user.id,
      roles: roles, // todo roles table
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.expiresIn,
      }),
      expiresIn: parseInt(jwtConstants.expiresIn),
      roles: roles,
    };
  }
}
