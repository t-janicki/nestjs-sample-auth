import { Controller, Post, Body, Res } from '@nestjs/common';
import { Public } from '../constants';
import { LoginDto } from '../login.dto';
import { Response } from 'express';
import { LoginService } from '../login.service';

@Controller()
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post('/auth/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.loginService.loginUser(loginDto, response);
  }
}
