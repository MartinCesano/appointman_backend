import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Servicio } from "../servicio/servicio.entity";
import { IEmpresa } from "src/gestion-empresa/interfaces/empresa.interface";
import { Empresa } from "../empresa/empresa.entity";
import { Disponibilidad } from "../disponibilidad/disponibilidad.entity";
import { IDisponibilidad } from "src/gestion-empresa/interfaces/disponibilidad.interface";
import { IPrestadorServicio } from "src/gestion-empresa/interfaces/prestador-servicio.interface";
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

    @OneToMany(() => Empresa, empresa => empresa.prestadores)
    empresa: IEmpresa;

    @ManyToMany(()=> Empleado, empleado => empleado.prestadores)
    empleados: Empleado[];
    
    @OneToMany(() => Disponibilidad, disponibilidad => disponibilidad.prestadorServicio)
    disponibilidades: IDisponibilidad[];
}
