import { Injectable, NotFoundException } from "@nestjs/common";
import { RegisterPostDto } from './register-post.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePostDto } from "./update-post.dto";

@Injectable()
export class PostService {
  private posts = [
    {
      id: '2e60c9cd-24f3-46b8-abf4-47fa0f1b243c',
      name: 'post-1',
    },
    {
      id: '5718c926-ded0-4805-8b8f-e2f876801dcd',
      name: 'post-2',
    },
    {
      id: '1a06dcd2-a5f6-42f3-aee3-44e5b54fe8f6',
      name: 'post-3',
    },
  ];

  getPosts(): any[] {
    return this.posts;
  }

  getPostById(postId: string) {
    return this.posts.find((p) => p.id === postId);
  }

  createPost(registerPostDto: RegisterPostDto) {
    const newUuid = uuidv4();
    this.posts.push({ id: newUuid, name: registerPostDto.name });
    return { id: newUuid, name: registerPostDto.name };
  }

  deletePosts(): any[] {
    this.posts = [];
    return this.posts;
  }

  deletePostById(postId: string) {
    this.posts = this.posts.filter((p) => p.id !== postId);
    return this.posts;
  }

  updatePost(postId: string, dto: UpdatePostDto) {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) {
      throw new NotFoundException(`Post with id: ${postId} not found.`);
    }
    post.name = dto.name;
    return post;
  }
}
