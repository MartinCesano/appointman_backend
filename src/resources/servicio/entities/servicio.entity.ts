import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from 'typeorm';
import { IServicio } from 'src/interfaces/servicio.interface';
import { Empleado } from 'src/resources/empleado/entities/empleado.entity';
import { IEmpleado } from 'src/interfaces/empleado.interface';

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
}