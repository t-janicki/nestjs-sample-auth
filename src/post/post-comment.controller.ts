import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { RegisterCommentDto } from '../comment/register-comment.dto';

@Controller('/posts/:postId/comments')
export class PostCommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  async registerComment(
    @Param('postId') postId: string,
    @Body() commentDto: RegisterCommentDto,
  ) {
    return this.commentService.createComment(postId, commentDto);
  }
  @Get()
  async getPostComments(@Param('postId') postId: string) {
    return this.commentService.getComments(postId);
  }
}
