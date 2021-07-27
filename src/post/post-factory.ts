import { Injectable } from '@nestjs/common';
import { RegisterPostDto } from './register-post.dto';
import { Post } from './post.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PostFactory {
  create(registerPostDto: RegisterPostDto, user: User): Post {
    return {
      name: registerPostDto.name,
      user: user,
    };
  }
}
