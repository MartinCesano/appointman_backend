import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Turno } from '../turno/turno.entity';
import { EstadoReserva } from '../estado-reserva/estado-reserva.entity';

@Entity()
export class Reserva extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @Column()
    hora: string;

    @ManyToOne(() => Cliente, cliente => cliente.reservas)
    cliente: Cliente;

    @OneToMany(() => Turno, turno => turno.reserva, { cascade: true })
    turnos: Turno[];

    @ManyToOne(() => EstadoReserva, estadoReserva => estadoReserva.reservas)
    estadoReserva: EstadoReserva;
}