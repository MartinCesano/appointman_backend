import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, BaseEntity} from 'typeorm';
import { IServicio } from '../../interfaces/servicio.interface';
import { Empleado } from '../empleado/empleado.entity';
import { IEmpleado } from '../../interfaces/empleado.interface';
import {IEmpresa} from "../../interfaces/empresa.interface";
import { Empresa} from "src/gestion-empresa/modules/empresa/empresa.entity";
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

    @ManyToOne(() => Empresa, empresa => empresa.servicio)
    empresa: IEmpresa;

    @ManyToMany(() => PrestadorServicio, prestador => prestador.servicios)
    prestadores: IPrestadorServicio[];
}