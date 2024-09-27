import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hora } from '../../hora/entities/hora.entity'; // Asegúrate de que esta ruta sea correcta
import { ITurno } from 'src/interfaces/turno.interface';

@Entity() // Agregar el decorador @Entity
export class Turno extends BaseEntity implements ITurno{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hora, hora => hora.turnos) // Relación a Hora
  hora: Hora; // Cada Turno tiene una Hora
}
