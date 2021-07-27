import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostFactory } from './post-factory';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],
  providers: [PostService, PostFactory],
  exports: [PostService],
})
export class PostModule {}
