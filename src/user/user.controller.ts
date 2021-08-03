import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/constants';
import { RegisterUserDto } from './register-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post()
  registerUser(@Body() userDto: RegisterUserDto) {
    return this.userService.saveUser(userDto);
  }

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getByEmail(username);
  }
}
