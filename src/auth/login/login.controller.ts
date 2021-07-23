import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class LoginController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  login(@Request() req) {
    const user = req.user;
    return this.authService.login(user);
  }

  @Get('/profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return this.userService.findByUsername(req.user.username);
  }
}
