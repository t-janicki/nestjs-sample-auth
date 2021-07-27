import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterPostDto } from './register-post.dto';
import { UpdatePostDto } from './update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PostFactory } from './post-factory';
import { UsersService } from '../user/users.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly postFactory: PostFactory,
    private readonly userService: UsersService,
  ) {}

  async getPosts(): Promise<Post[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async getPostById(postId: string) {
    return await this.postRepository.findOne({ id: postId });
  }

  async createPost(
    registerPostDto: RegisterPostDto,
    userId: string,
  ): Promise<Post> {
    const user = await this.userService.getById(userId);
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
}
