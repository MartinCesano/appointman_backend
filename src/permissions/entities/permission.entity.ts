import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity} from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { UserEntity } from '../../users/user.entity';
import { IPermiso } from 'src/interfaces/permisos.interface';

@Entity()
export class Permiso extends BaseEntity implements IPermiso	{
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => RoleEntity, role => role.permisos)
  roles: RoleEntity[];

  @ManyToMany(() => UserEntity, user => user.permisos)
  users: UserEntity[];
}
