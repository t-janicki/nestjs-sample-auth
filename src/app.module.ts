import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginController } from './auth/login/login.controller';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';

@Module({
  imports: [AuthModule, UsersModule, PostModule],
  controllers: [AppController, LoginController, PostController],
  providers: [AppService],
})
export class AppModule {}
