import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from "typeorm";
import {ICliente} from "../../../interfaces/cliente.interface";
import { Usuario} from "../../../auth/modules/usuario/usuario.entity";

@Entity("cliente")
export class ClienteEntity extends Usuario implements ICliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    fechaNacimiento?: string | null;

    @Column()
    genero: string;

}