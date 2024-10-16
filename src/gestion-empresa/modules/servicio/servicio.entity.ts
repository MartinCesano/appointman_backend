import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, BaseEntity} from 'typeorm';
import { IServicio } from 'src/gestion-empresa/interfaces/servicio.interface';
import { Empleado } from 'src/gestion-empresa/modules/empleado/empleado.entity';
import { IEmpleado } from 'src/gestion-empresa/interfaces/empleado.interface';
import {Sucursal} from "../sucursal/sucursal.entity";
import {ISucursal} from "../../interfaces/sucursal.interface";
import {IEmpresa} from "../../interfaces/empresa.interface";
import { Empresa} from "src/gestion-empresa/modules/empresa/empresa.entity";
import { IPrestadorServicio } from 'src/gestion-empresa/interfaces/prestador-servicio.interface';
import { PrestadorServicio } from '../prestador-servicio/prestador-servicio.entity';

@Entity('servicio')
export class Servicio extends BaseEntity implements IServicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({nullable: true})
    descripcion: string;

    @Column()
    precio: number;

    @Column()
    duracion: number;

    @ManyToMany(() => Empleado, empleado => empleado.capacidades)
    empleados: IEmpleado[];

    @ManyToOne(() => Empresa, empresa => empresa.servicio)
    empresa: IEmpresa;

    @ManyToMany(() => PrestadorServicio, prestador => prestador.servicios)
    prestadores: IPrestadorServicio[];
}