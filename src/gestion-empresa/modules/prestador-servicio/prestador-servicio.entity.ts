import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Servicio } from "../servicio/servicio.entity";
import { IEmpresa } from "../../interfaces/empresa.interface";
import { Empresa } from "../empresa/empresa.entity";
import { Disponibilidad } from "../disponibilidad/disponibilidad.entity";
import { IDisponibilidad } from "../../interfaces/disponibilidad.interface";
import { IPrestadorServicio } from "../../interfaces/prestador-servicio.interface";
import { Empleado } from "../empleado/empleado.entity";

@Entity()
export class PrestadorServicio extends BaseEntity implements IPrestadorServicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @ManyToMany(() => Servicio, servicio => servicio.prestadores)
    @JoinTable()
    servicios: Servicio[];

    @ManyToOne(() => Empresa, empresa => empresa.prestadores)
    empresa: IEmpresa;

    @ManyToMany(()=> Empleado, empleado => empleado.prestadores)
    @JoinTable()
    empleados: Empleado[];
    
    @OneToMany(() => Disponibilidad, disponibilidad => disponibilidad.prestadorServicio)
    disponibilidades: IDisponibilidad[];
}
