import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { IUsuario } from '../../interfaces/user.interface';
import { Rol } from '../roles/entities/role.entity';
import { Permiso } from 'src/resources/permissions/entities/permission.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  contrasena: string;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  telefono: string;

  @ManyToMany(() => Rol, role => role.users , { eager: true })
  @JoinTable()
  roles: Rol[];

  @ManyToMany(() => Permiso, permisos => permisos.users, { eager: true })
  @JoinTable()
  permisos: Permiso[];

  get permissionCodes() {
    if (!this.permisos) {
      return [];
    }
    return this.permisos.map(permisos => permisos.nombre);
  }
}
