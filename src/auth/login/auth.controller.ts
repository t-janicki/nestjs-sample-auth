import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { PasswordService } from '../password.service';
import { Public } from '../constants';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  login(@Request() req) {
    const user = req.user;
    return this.authService.login(user);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return this.userService.findByUsername(req.user.username);
  }

  @Public()
  @Get('/password')
  encodePassword() {
    return this.passwordService.encodePassword('password');
  }
}
