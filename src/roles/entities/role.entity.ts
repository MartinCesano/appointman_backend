import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { Permiso } from '../../permissions/entities/permission.entity';
import { UserEntity } from '../../users/user.entity';
import { IRol } from 'src/interfaces/rol.interface';

@Entity('roles')
export class RoleEntity extends BaseEntity implements IRol{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
  
  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Permiso, permisos => permisos.roles)
  
  @JoinTable()
  permisos: Permiso[];

  @ManyToMany(() => UserEntity, user => user.roles)

  @JoinTable()
  users: UserEntity[];
}