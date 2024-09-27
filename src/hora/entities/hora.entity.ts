import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Turno } from '../../turno/entities/turno.entity'; 
import { Horario } from '../../horario/entities/horario.entity'; 
import { IHora } from 'src/interfaces/hora.interface';
import { IHorario } from 'src/interfaces/horario.interface';
import { ITurno } from 'src/interfaces/turno.interface';

@Entity()
export class Hora extends BaseEntity implements IHora {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  horaInicio: string;
  
  @Column()
  horaFin: string;

  @ManyToMany(() => Horario, horario => horario.horas)
  @JoinTable()
  horarios: IHorario[];

  @OneToMany(() => Turno, turno => turno.hora) 
  turnos: ITurno[]; 
}
