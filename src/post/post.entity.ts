import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'name ' })
  name: string;

  @ManyToOne(() => User)
  user: User;
}
