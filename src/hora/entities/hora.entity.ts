import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Turno } from '../../turno/entities/turno.entity'; // Asegúrate de que esta ruta sea correcta
import { Horario } from '../../horario/entities/horario.entity'; // Asegúrate de que esta ruta sea correcta

@Entity()
export class Hora extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: string;
  
  @Column()
  endTime: string;

  @ManyToMany(() => Horario, horario => horario.horas) // Cambiado de Schedule a Horario
  @JoinTable()
  horario: Horario[];

  @OneToMany(() => Turno, turno => turno.horas) // Cambiado de Appointment a Turno
  turno: Turno[];
}
