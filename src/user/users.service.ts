import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';
import { UserFactory } from './user-factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userFactory: UserFactory,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async saveUser(userDto: RegisterUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      email: userDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user: UserEntity = await this.userFactory.create(userDto);
    return this.userRepository.save(user);
  }

  async getByEmailOrThrow(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email: email });
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
}
