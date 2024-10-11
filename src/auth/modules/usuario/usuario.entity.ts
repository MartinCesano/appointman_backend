import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, ManyToOne } from 'typeorm';
import { IUsuario } from 'src/auth/interfaces/user.interface';
import { Rol } from '../rol/rol.entity';
import { Permiso } from '../permiso/permiso.entity';

@Entity()
export abstract class Usuario extends BaseEntity implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({nullable: true})
  email: string;
  @Column()
  contrasena: string;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  telefono: string;

  @ManyToOne(() => Rol, role => role.users , { eager: true })
  @JoinTable()
  rol: Rol;

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
