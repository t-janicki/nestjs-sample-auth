import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Public } from '../constants';
import { LoginDto } from '../login.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/auth/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    const responseDto = await this.authService.authenticateUser(loginDto);
    const token = responseDto.accessToken;
    response.cookie('device', 'e4ba2768-6184-487d-a4d5-e9aa45abad41');
    response.cookie('accessToken', token, {
      httpOnly: true,
      path: '/',
      secure: true,
    });
    return {
      expiresIn: responseDto.expiresIn,
      roles: responseDto.roles,
    };
  }
}
