import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity} from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { IPermiso } from 'src/auth/interfaces/permisos.interface';

@Entity()
export class Permiso extends BaseEntity implements IPermiso	{
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Rol, role => role.permisos)
  roles: Rol[];

  @ManyToMany(() => Usuario, user => user.permisos)
  users: Usuario[];
}
