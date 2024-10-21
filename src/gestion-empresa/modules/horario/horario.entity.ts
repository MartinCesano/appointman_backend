import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
import { Hora } from '../../../gestion-reserva-cliente/modules/hora/hora.entity';
import { IHora } from '../../../gestion-reserva-cliente/interfaces/hora.interface';
import { IHorario } from '../../../gestion-reserva-cliente/interfaces/horario.interface';
import { Empresa} from "../empresa/empresa.entity";

@Entity()
export class

Horario extends BaseEntity implements IHorario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @ManyToMany(() => Hora, hora => hora.horarios, { cascade: true, onDelete: 'CASCADE', eager: true }) // Cambiado a 'horarios'
  horas: IHora[];

  @Column("simple-array", {default: ''})
  diasActivos: string;

  @ManyToOne(() => Empresa, empresa => empresa.horario)
  empresa: Empresa;

}
