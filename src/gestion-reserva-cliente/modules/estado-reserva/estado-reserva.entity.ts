import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {BaseEntity} from "typeorm";
import { Reserva } from '../reserva/reserva.entity';

@Entity()
export class EstadoReserva extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(() => Reserva, reserva => reserva.estadoReserva)
    reservas: Reserva[];
}

