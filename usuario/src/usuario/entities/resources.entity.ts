import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity({ name: 'resources' })
export class ResourceEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'route', nullable: true })
  route: string;

  @Column({ name: 'isMenu' })
  isMenu: boolean;

  @ManyToMany(() => ProfileEntity, (profile) => profile.resources)
  @JoinTable()
  profiles: ProfileEntity[];
}
