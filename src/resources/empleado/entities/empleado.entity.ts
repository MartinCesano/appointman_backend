import { Usuario } from "../../../auth/modules/usuario/usuario.entity";
import { IEmpleado } from "../../../interfaces/empleado.interface";
import { Servicio } from "../../../resources/servicio/entities/servicio.entity";
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
