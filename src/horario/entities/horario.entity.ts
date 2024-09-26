import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { IHorario } from './horario.interface';
import { Hora } from '../../hora/entities/hora.entity';

@Entity()
export class Horario extends BaseEntity implements IHorario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Hora, hora => hora.horario, { cascade: true, onDelete: 'CASCADE', eager: true })
  horas: Hora[];
}
