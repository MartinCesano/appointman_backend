import { IUsuario } from "src/auth/interfaces/usuario.interface";
import { Usuario } from "src/auth/modules/usuario/usuario.entity";
import { IEmpleado } from "src/interfaces/empleado.interface";
import { IServicio } from "src/interfaces/servicio.interface";
import { Servicio } from "src/resources/servicio/entities/servicio.entity";
import { Column, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Empleado implements IEmpleado{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column() 
    cuil: string; 

    @ManyToMany(() => Servicio, servicio => servicio.empleados) 
    capacidades: IServicio[];

    @OneToOne(() => Usuario, usuario => usuario.empleado)
    usuario: IUsuario;

}
