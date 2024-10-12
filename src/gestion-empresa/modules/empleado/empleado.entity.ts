import { IUsuario } from "src/auth/interfaces/usuario.interface";
import { Usuario } from "src/auth/modules/usuario/usuario.entity";
import { IEmpleado } from "src/gestion-empresa/interfaces/empleado.interface";
import { IServicio } from "src/gestion-empresa/interfaces/servicio.interface";
import { Servicio } from "src/gestion-empresa/modules/servicio/servicio.entity";
import { BaseEntity, Column, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity('empleado')
export class Empleado extends BaseEntity implements IEmpleado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cuil: string;

    @ManyToMany(() => Servicio, servicio => servicio.empleados)
    @JoinTable()
    capacidades: Servicio[];

    @OneToOne(() => Usuario, usuario => usuario.empleado)
    usuario: Usuario;
}
