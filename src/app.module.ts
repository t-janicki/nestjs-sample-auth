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
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { Post } from "./post/post.entity";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'project_nestjs',
      entities: [User, Post],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      synchronize: true,
      migrationsRun: true,
      logging: true,
      logger: 'file',
    }),
  ],
  controllers: [AppController, AuthController, PostController, UserController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
