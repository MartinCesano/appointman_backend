import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany} from 'typeorm';
import {BaseEntity} from "typeorm";
import { Turno } from '../turno/turno.entity';  

@Entity()
export class EstadoTurno extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(() => Turno, turno => turno.estadoTurno)
    turnos: Turno[];
}

