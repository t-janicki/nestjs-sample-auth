import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { RegisterCommentDto } from './register-comment.dto';
import { PostService } from '../post/post.service';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  async createComment(postId: string, dto: RegisterCommentDto) {
    const comment: CommentEntity = {
      description: dto.description,
      post: await this.getPost(postId),
    };
    return this.commentRepository.save(comment);
  }

  async getComments(postId: string) {
    return await this.commentRepository.getCommentsByPostId(postId);
  }

  private async getPost(postId: string) {
    const post = await this.postService.getPostById(postId);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
