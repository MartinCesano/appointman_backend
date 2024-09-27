import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Hora } from '../../hora/entities/hora.entity'; // Asegúrate de que esta ruta sea correcta
export class Turno {
    @ManyToOne(() => Hora, hora => hora.turno)
    horas: Hora[];
}
