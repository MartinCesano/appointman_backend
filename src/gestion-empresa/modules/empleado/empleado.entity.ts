import { Usuario } from "../../../auth/modules/usuario/usuario.entity";
import { IEmpleado } from "../../interfaces/empleado.interface";
import { Servicio } from "../servicio/servicio.entity";
import {BaseEntity, Column, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany} from "typeorm";
import { Empresa } from "../empresa/empresa.entity";
import { IEmpresa } from "../../interfaces/empresa.interface";
import { PrestadorServicio } from "../prestador-servicio/prestador-servicio.entity";

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

    @ManyToOne(() => Empresa, empresa => empresa.empleados)
    empresa?: IEmpresa;

    @ManyToMany(()=> PrestadorServicio, prestadorServicio => prestadorServicio.empleados)
    prestadores: PrestadorServicio[];
}
