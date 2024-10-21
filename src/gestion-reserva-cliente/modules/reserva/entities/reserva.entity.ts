import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Cliente } from '../../cliente/cliente.entity';
import { Turno } from '../../turno/turno.entity';

@Entity()
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: string;

    @ManyToOne(() => Cliente, cliente => cliente.reservas)
    cliente: Cliente;

    @ManyToOne(() => Turno)
    @JoinTable()
    turnos: Turno[];
}