import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostFactory } from './post-factory';
import { UsersModule } from '../user/users.module';
import { PostRepository } from './post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostRepository]),
    UsersModule,
  ],
  providers: [PostService, PostFactory],
  exports: [PostService],
})
export class PostModule {}
