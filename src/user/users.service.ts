import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { RegisterUserDto } from './register-user.dto';
import { UserFactory } from './user-factory';
import { UpdateUserDto } from './update-user.dto';
import { PasswordService } from '../auth/password.service';
import { UpdatePasswordDto } from '../auth/update-password.dto';
import { RoleEntity } from './role.entity';
import { Role } from '../auth/role.enum';
import { RoleService } from './role.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleService: RoleService,
    private readonly userFactory: UserFactory,
    private readonly passwordService: PasswordService,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ['roles'] });
  }

  async saveUser(userDto: RegisterUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      email: userDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const role: RoleEntity[] = await this.roleService.getRolesByName(Role.USER);
    const user: UserEntity = await this.userFactory.create(userDto, role);
    return this.userRepository.save(user);
  }

  async getByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { email: email },
      { relations: ['roles'] },
    );
    if (!user) {
      throw new NotFoundException(`User not found by email: ${email}`);
    }
    return user;
  }

  async getByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      { id: id },
      { relations: ['roles'] },
    );
    if (!user) {
      throw new NotFoundException(`User not found by id: ${id}`);
    }
    return user;
  }

  async updateInfoAboutMe(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getByIdOrThrow(id);
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    return this.userRepository.save(user);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getByIdOrThrow(id);
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.isActive = dto.isActive;
    return this.userRepository.save(user);
  }

  async changePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getByIdOrThrow(id);
    if (
      await this.passwordService.matchesPassword(
        dto.currentPassword,
        user.password,
      )
    ) {
      user.password = await this.passwordService.encodePassword(
        dto.newPassword,
      );
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException('Incorrect current password');
    }
  }
}
