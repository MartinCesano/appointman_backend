import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToOne, JoinColumn} from 'typeorm';
import { IUsuario } from 'src/auth/interfaces/usuario.interface';
import { Rol } from '../rol/rol.entity';
import { Permiso } from '../permiso/permiso.entity';
import { IEmpleado } from 'src/gestion-empresa/interfaces/empleado.interface';
import { ICliente } from 'src/gestion-reserva-cliente/interfaces/cliente.interface';
import { IEmprendedor } from 'src/gestion-empresa/interfaces/emprendedor.interface';
import { Emprendedor } from 'src/gestion-empresa/modules/emprendedor/emprendedor.entity';
import { Empleado } from 'src/gestion-empresa/modules/empleado/empleado.entity';
import { Cliente } from 'src/gestion-reserva-cliente/modules/cliente/cliente.entity';

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
