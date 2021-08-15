import { Injectable } from '@nestjs/common';
import { RegisterPostDto } from './register-post.dto';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class PostFactory {
  create(registerPostDto: RegisterPostDto, user: UserEntity): PostEntity {
    return {
      name: registerPostDto.name,
      user: user,
    };
  }
}
