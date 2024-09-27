import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Hora } from '../../hora/entities/hora.entity'; // Asegúrate de que esta ruta sea correcta

@Entity() // Agregar el decorador @Entity
export class Turno extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Hora, hora => hora.turnos) // Relación a Hora
  hora: Hora; // Cada Turno tiene una Hora
}
