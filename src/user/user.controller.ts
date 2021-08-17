import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/constants';
import { RegisterUserDto } from './register-user.dto';
import { UserDeviceGuard } from '../auth/user-device.guard';
import { UserDto } from './user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpdatePasswordDto } from '../auth/update-password.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post()
  registerUser(@Body() userDto: RegisterUserDto) {
    return this.userService.saveUser(userDto);
  }

  @Get()
  @UseGuards(UserDeviceGuard)
  async getUsers() {
    const users = await this.userService.findAll();
    return users.map((user) => {
      const result: UserDto = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
        createdAt: user.createdAt,
        roles: user.roles.map((r) => r.name),
      };
      return result;
    });
  }

  @Patch('/password')
  async changePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
    const user = await this.userService.changePassword(req.user.userId, dto);
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

  @Put()
  async changeUserInfo(@Request() req, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateUser(req.user.userId, dto);
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
