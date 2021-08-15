import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/role.enum';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'enum', enum: Role, unique: true })
  name: Role;
}
