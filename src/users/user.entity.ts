import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { IUsuario } from '../interfaces/user.interface';
import { RoleEntity } from '../roles/entities/role.entity';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';

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

  @ManyToMany(() => RoleEntity, role => role.users , { eager: true })
  @JoinTable()
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, permisos => permisos.users, { eager: true })
  @JoinTable()
  permisos: PermissionEntity[];

  get permissionCodes() {
    if (!this.permisos) {
      return [];
    }
    return this.permisos.map(permisos => permisos.nombre);
  }
}
