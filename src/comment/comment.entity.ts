import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'description' })
  description: string;

  @ManyToOne(() => Post)
  post: Post;
}
