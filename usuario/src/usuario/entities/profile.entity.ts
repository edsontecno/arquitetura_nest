import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ResourceEntity } from './resources.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.profiles)
  users: UserEntity[];

  @ManyToMany(() => ResourceEntity, (resource) => resource.profiles)
  @JoinColumn()
  resources: ResourceEntity[];
}
