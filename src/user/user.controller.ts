import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/constants';
import { RegisterUserDto } from './register-user.dto';
import { UserDeviceGuard } from '../auth/user-device.guard';
import { UserDto } from './user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UsersService) {
  }

  @Public()
  @Post()
  registerUser(@Body() userDto: RegisterUserDto) {
    return this.userService.saveUser(userDto);
  }

  @Get()
  @UseGuards(UserDeviceGuard)
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/profile')
  async getProfile(@Request() req): Promise<UserDto> {
    const user = await this.userService.getByIdOrThrow(req.user.userId);
    // todo factory or find mapper
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      roles: user.roles.map((r) => r.name),
    };
  }
}
