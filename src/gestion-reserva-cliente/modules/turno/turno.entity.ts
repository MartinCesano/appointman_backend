import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hora } from '../hora/hora.entity'; // Asegúrate de que esta ruta sea correcta
import { ITurno } from 'src/gestion-reserva-cliente/interfaces/turno.interface';
import { Disponibilidad } from 'src/gestion-empresa/modules/disponibilidad/disponibilidad.entity';
import { IDisponibilidad } from 'src/gestion-empresa/interfaces/disponibilidad.interface';
import { IHora } from 'src/gestion-reserva-cliente/interfaces/hora.interface';

@Entity() // Agregar el decorador @Entity
export class Turno extends BaseEntity implements ITurno{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hora, hora => hora.turnos)
  hora: IHora;

  @ManyToOne(() => Disponibilidad, disponibilidad => disponibilidad.turnos)
  disponibilidad: IDisponibilidad;
}
