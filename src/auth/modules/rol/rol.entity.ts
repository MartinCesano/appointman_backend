import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany} from 'typeorm';
import { Permiso } from '../permiso/permiso.entity';
import { Usuario } from '../usuario/usuario.entity';
import { IRol } from '../../interfaces/rol.interface';

@Entity('roles')
export class Rol extends BaseEntity implements IRol{
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  nombre: string;
  
  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Permiso, permisos => permisos.roles)
  
  @JoinTable()
  permisos: Permiso[];

  @OneToMany(() => Usuario, user => user.roles)

  @JoinTable()
  users: Usuario[];
}