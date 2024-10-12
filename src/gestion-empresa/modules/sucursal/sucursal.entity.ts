import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Empresa } from "../empresa/empresa.entity";
import { ISucursal } from "src/gestion-empresa/interfaces/sucursal.interface";
import { IEmpresa } from "src/gestion-empresa/interfaces/empresa.interface";

@Entity("sucursal")
export class Sucursal extends BaseEntity implements ISucursal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    domicilio: string;


    @Column()
    telefono?: string;

    @Column()
    email?: string;

    @ManyToOne(() => Empresa, empresa => empresa.sucursales)
    empresa: IEmpresa;

}
