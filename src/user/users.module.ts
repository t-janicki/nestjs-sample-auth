import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PasswordService } from '../auth/password.service';
import { UserFactory } from './user-factory';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, PasswordService, UserFactory],
  exports: [UsersService],
})
export class UsersModule {}
