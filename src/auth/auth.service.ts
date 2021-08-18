import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { JwtPayload } from './jwt-payload';
import { UserEntity } from '../user/user.entity';
import { jwtConstants } from './constants';
import { RoleEntity } from '../user/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async authenticateUser(password: string, user: UserEntity) {
    if (await this.passwordService.matchesPassword(password, user.password)) {
      return this.createToken(user);
    }
    throw new BadRequestException('Incorrect username or password.');
  }

  private async createToken(user: UserEntity) {
    const roles = user.roles.map((role: RoleEntity) => role.name);
    const payload: JwtPayload = {
      email: user.email,
      userId: user.id,
      roles: roles,
    };
    return {
      token: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.expiresIn + 's',
      }),
      expiresIn: jwtConstants.expiresIn,
    };
  }
}
