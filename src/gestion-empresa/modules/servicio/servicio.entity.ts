import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from 'typeorm';
import { IServicio } from '../../interfaces/servicio.interface';
import { Empleado } from '../empleado/empleado.entity';
import { IEmpleado } from '../../interfaces/empleado.interface';
import {Sucursal} from "../sucursal/sucursal.entity";
import {ISucursal} from "../../interfaces/sucursal.interface";
import { IPrestadorServicio } from '../../interfaces/prestador-servicio.interface';
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

    @ManyToMany(() => Sucursal, sucursal => sucursal.servicios)
    sucursales: ISucursal[];

    @ManyToMany(() => PrestadorServicio, prestador => prestador.servicios)
    prestadores: IPrestadorServicio[];
}