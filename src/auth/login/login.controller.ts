import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { UsersService } from '../../users/users.service';
import { Public } from '../constants';

@Controller()
export class LoginController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Public()
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return this.userService.findByUsername('john');
  }
}
