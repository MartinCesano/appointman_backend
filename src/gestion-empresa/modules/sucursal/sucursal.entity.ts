import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Empresa } from "../empresa/empresa.entity";
import { ISucursal } from "../../interfaces/sucursal.interface";
import { IEmpresa } from "../../interfaces/empresa.interface";

@Entity("sucursal")
export class Sucursal extends BaseEntity implements ISucursal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domicilio: string;

    @Column() 
    nombre: string;

    @Column()
    telefono?: string;

    @Column()
    email?: string;

    @ManyToOne(() => Empresa, empresa => empresa.sucursales)
    empresa: IEmpresa;

}
