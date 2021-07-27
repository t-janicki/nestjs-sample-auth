import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './register-user.dto';
import { UserFactory } from './user-factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userFactory: UserFactory,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async saveUser(userDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      email: userDto.email,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user: User = await this.userFactory.create(userDto);
    return this.userRepository.save(user);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`User not found by email: ${email}`);
    }
    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) {
      throw new NotFoundException(`User not found by id: ${id}`);
    }
    return user;
  }
}
