import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), PostModule],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
