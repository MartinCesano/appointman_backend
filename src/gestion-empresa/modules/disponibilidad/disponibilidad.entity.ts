import { IDisponibilidad } from '../../interfaces/disponibilidad.interface';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Turno } from '../../../gestion-reserva-cliente/modules/turno/turno.entity';
import { ITurno } from '../../../gestion-reserva-cliente/interfaces/turno.interface';
import { DateTime } from 'luxon';
import { PrestadorServicio } from '../prestador-servicio/prestador-servicio.entity';
import { IPrestadorServicio } from '../../interfaces/prestador-servicio.interface';

@Entity()
export class Disponibilidad extends BaseEntity implements IDisponibilidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: DateTime;

  @Column({ type: 'time' })
  horaInicio: DateTime;

  @Column({ type: 'time' })
  horaFin: DateTime;

  @ManyToOne(() => PrestadorServicio, prestadorServicio => prestadorServicio.disponibilidades)
  prestadorServicio: IPrestadorServicio;

  @OneToMany(() => Turno, turno => turno.disponibilidad)
  turnos: ITurno[];
}