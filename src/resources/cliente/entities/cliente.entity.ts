import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from "typeorm";
import {ICliente} from "../../interfaces/cliente.interface";
import {UserEntity} from "../../entities/user.entity";

@Entity("cliente")
export class ClienteEntity extends UserEntity implements ICliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    telefono: number;

    @Column({nullable: true})
    fechaNacimiento?: string | null;

    @Column()
    genero: string;

    @Column({nullable: true})
    documento?: number | null;
}