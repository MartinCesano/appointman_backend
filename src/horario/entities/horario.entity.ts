import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Hora } from '../../hora/entities/hora.entity';

@Entity()
export class Horario extends BaseEntity   {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Hora, hora => hora.horarios, { cascade: true, onDelete: 'CASCADE', eager: true }) // Cambiado a 'horarios'
  horas: Hora[];
}
