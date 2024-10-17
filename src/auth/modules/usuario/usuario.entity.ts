import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToOne, JoinColumn} from 'typeorm';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Rol } from '../rol/rol.entity';
import { Permiso } from '../permiso/permiso.entity';
import { IEmpleado } from '../../../gestion-empresa/interfaces/empleado.interface';
import { IEmprendedor } from '../../../gestion-empresa/interfaces/emprendedor.interface';
import { Emprendedor } from '../../../gestion-empresa/modules/emprendedor/emprendedor.entity';
import { Empleado } from '../../../gestion-empresa/modules/empleado/empleado.entity';
import { Cliente } from '../../../gestion-reserva-cliente/modules/cliente/cliente.entity';

@Entity()
export class Usuario extends BaseEntity implements IUsuario {
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

  @ManyToMany(() => Rol, role => role.users , { eager: true })
  @JoinTable()
  roles: Rol[];

  @OneToOne(() => Empleado, empleado => empleado.usuario)
  @JoinColumn()
  empleado: IEmpleado;

  @OneToOne(() => Cliente, cliente => cliente.usuario)
  @JoinColumn()
  cliente: Cliente;

  @OneToOne(() => Emprendedor, emprendedor => emprendedor.usuario)
  @JoinColumn()
  emprendedor: IEmprendedor;


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
