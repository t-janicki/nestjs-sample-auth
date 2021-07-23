import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/login/auth.controller';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';

@Module({
  imports: [AuthModule, UsersModule, PostModule],
  controllers: [AppController, AuthController, PostController],
  providers: [AppService],
})
export class AppModule {}
