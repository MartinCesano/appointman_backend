import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from 'typeorm';
import {BaseEntity} from "typeorm";
import {ICliente} from "../../../interfaces/cliente.interface";
import { Usuario} from "../../../../auth/modules/usuario/usuario.entity";
import { IUsuario } from 'src/auth/interfaces/usuario.interface';

@Entity('cliente')
export class Cliente extends BaseEntity implements ICliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    fechaNacimiento?: string | null;

    @Column()
    documento: number;

    @OneToOne(() => Usuario, usuario => usuario.cliente)
    usuario: IUsuario;

}