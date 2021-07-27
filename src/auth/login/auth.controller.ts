import { Controller, Request, Post, Get, Body } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../user/users.service';
import { Public } from '../constants';
import { LoginDto } from '../login.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Post('/auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.authenticateUser(loginDto);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return this.userService.getByEmail(req.user.username);
  }
}
