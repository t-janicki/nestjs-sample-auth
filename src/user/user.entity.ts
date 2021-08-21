import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'first_name ' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'created_at' })
  createdAt?: Date;

  @ManyToMany(() => RoleEntity, (role: RoleEntity) => role.id)
  @JoinTable({
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles?: RoleEntity[];
}
