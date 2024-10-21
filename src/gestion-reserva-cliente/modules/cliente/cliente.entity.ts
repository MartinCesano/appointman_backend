import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from 'typeorm';
import {BaseEntity} from "typeorm";
import {ICliente} from "../../interfaces/cliente.interface";
import { Usuario} from "../../../auth/modules/usuario/usuario.entity";
import { IUsuario } from '../../../auth/interfaces/usuario.interface';
import { Reserva } from '../reserva/entities/reserva.entity';

@Entity("cliente")
export class Cliente extends BaseEntity implements ICliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    fechaNacimiento?: string | null;

    @Column()
    documento: number;

    @OneToOne(() => Usuario, usuario => usuario.cliente)
    usuario: IUsuario;

    @OneToMany(() => Reserva, reserva => reserva.cliente, { cascade: true })
    reservas: Reserva[];
}