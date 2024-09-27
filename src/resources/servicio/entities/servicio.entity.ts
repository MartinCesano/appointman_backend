import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity} from 'typeorm';
import { IServicio } from 'src/interfaces/servicio.interface';

@Entity('servicio')
export class Servicio extends BaseEntity implements IServicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({nullable: true})
    descripcion: string;

    @Column()
    precio: number;

    @Column()
    duracion: number;
}