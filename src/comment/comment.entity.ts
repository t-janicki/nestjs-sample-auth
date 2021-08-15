import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'description' })
  description: string;

  @ManyToOne(() => PostEntity)
  post: PostEntity;
}
