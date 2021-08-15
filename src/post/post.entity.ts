import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

// import { Comment } from '../comment/comment.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // @OneToMany(() => Comment, (comment) => comment.post)
  // comments?: Comment[];
}
