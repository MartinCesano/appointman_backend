import { IDisponibilidad } from 'src/gestion-empresa/interfaces/disponibilidad.interface';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from 'typeorm';
import { Empleado } from '../empleado/empleado.entity';
import { IEmpleado } from 'src/gestion-empresa/interfaces/empleado.interface';
import { Turno } from 'src/gestion-reserva-cliente/modules/turno/turno.entity';
import { ITurno } from 'src/gestion-reserva-cliente/interfaces/turno.interface';
import { DateTime } from 'luxon';

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

  @ManyToOne(() => Empleado, empleado => empleado.disponibilidades)
  empleado: IEmpleado;

  @OneToMany(() => Turno, turno => turno.disponibilidad)
  turnos: ITurno[];
}