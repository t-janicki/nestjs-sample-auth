import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterPostDto } from './register-post.dto';
import { UpdatePostDto } from './update-post.dto';
import { PostEntity } from './post.entity';
import { DeleteResult } from 'typeorm';
import { PostFactory } from './post-factory';
import { UsersService } from '../user/users.service';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly postFactory: PostFactory,
    private readonly userService: UsersService,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async getPostById(postId: string) {
    return await this.postRepository.findOne(
      { id: postId },
      { relations: ['user'] },
    );
  }

  async createPost(
    registerPostDto: RegisterPostDto,
    userId: string,
  ): Promise<PostEntity> {
    const user = await this.userService.getByIdOrThrow(userId);
    const post = this.postFactory.create(registerPostDto, user);
    return this.postRepository.save(post);
  }

  deletePosts(): Promise<DeleteResult> {
    return this.postRepository.delete({});
  }

  deletePostById(postId: string) {
    return this.postRepository.delete({ id: postId });
  }

  async updatePost(postId: string, dto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ id: postId });
    if (!post) {
      throw new NotFoundException(`Post with id: ${postId} not found.`);
    }
    post.name = dto.name;
    return this.postRepository.save(post);
  }

  async save(post: PostEntity) {
    return this.postRepository.save(post);
  }
}
