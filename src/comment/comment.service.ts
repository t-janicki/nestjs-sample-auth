import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { RegisterCommentDto } from './register-comment.dto';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async createComment(postId: string, dto: RegisterCommentDto) {
    const comment: Comment = {
      description: dto.description,
      post: await this.getPost(postId),
    };
    return this.commentRepository.save(comment);
  }

  async getComments(postId: string) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.post', 'post')
      .where('post.id = :postId', {
        postId: postId,
      })
      .getMany();
  }

  private async getPost(postId: string) {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
