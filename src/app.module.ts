import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { AuthController } from './auth/login/auth.controller';
import { PostModule } from './post/post.module';
import { PostController } from './post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserEntity } from './user/user.entity';
import { UserController } from './user/user.controller';
import { PostEntity } from './post/post.entity';
import { CommentEntity } from './comment/comment.entity';
import { PostCommentController } from './post/post-comment.controller';
import { CommentModule } from './comment/comment.module';
import { RoleEntity } from './user/role.entity';
import { UserDeviceModule } from './user-device/user-device.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UserDeviceEntity } from './user-device/user-device.entity';
import { RefreshTokenEntity } from './refresh-token/refresh-token.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    CommentModule,
    UserDeviceModule,
    RefreshTokenModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'project_nestjs',
      entities: [
        UserEntity,
        RoleEntity,
        PostEntity,
        CommentEntity,
        UserDeviceEntity,
        RefreshTokenEntity,
      ],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      synchronize: true,
      migrationsRun: false,
      logging: true,
      logger: 'file',
    }),
  ],
  controllers: [
    AppController,
    AuthController,
    PostController,
    PostCommentController,
    UserController,
  ],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
