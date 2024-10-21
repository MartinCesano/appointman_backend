import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BaseEntity, OneToMany } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Turno } from '../turno/turno.entity';

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
}