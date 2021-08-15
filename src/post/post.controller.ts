import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { RegisterPostDto } from './register-post.dto';
import { Roles } from '../auth/role.decarator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { UpdatePostDto } from './update-post.dto';
import { CurrentUser, LoggedUser } from '../auth/logged-user.decorator';

@Controller('/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get('/:postId')
  getPostById(@Param('postId') postId: string) {
    return this.postService.getPostById(postId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  registerPost(
    @CurrentUser() loggedUser: LoggedUser,
    @Body() postDto: RegisterPostDto,
  ) {
    return this.postService.createPost(postDto, loggedUser.userId);
  }

  @Delete()
  deletePosts() {
    return this.postService.deletePosts();
  }

  @Delete('/:postId')
  deletePostById(@Param('postId') postId: string) {
    return this.postService.deletePostById(postId);
  }

  @Put('/:postId')
  putPost(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(postId, dto);
  }
}
