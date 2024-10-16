import {BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Sucursal} from "../sucursal/sucursal.entity";
import {IEmpresa} from "src/gestion-empresa/interfaces/empresa.interface";
import {Empleado} from "../empleado/empleado.entity";
import {IEmpleado} from "src/gestion-empresa/interfaces/empleado.interface";
import { IPrestadorServicio } from "src/gestion-empresa/interfaces/prestador-servicio.interface";
import { PrestadorServicio } from "../prestador-servicio/prestador-servicio.entity";
import { IServicio } from "src/gestion-empresa/interfaces/servicio.interface";
import { Servicio } from "../servicio/servicio.entity";

@Entity("empresa")
export class Empresa extends BaseEntity implements IEmpresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    fotoPerfil: string;

    @Column()
    cuit: string;

    @Column()
    domicilio: string;

    @Column()
    telefono: string;

    @Column()
    email: string;

    @Column()
    descripcion: string;

    @OneToMany(() => Sucursal, sucursal => sucursal.empresa)
    sucursales: Sucursal[];

    @ManyToOne(() => PrestadorServicio, prestador => prestador.empresa)
    prestadores: IPrestadorServicio[];

    @OneToMany(() => Empleado, empleado => empleado.empresa)
    empleados: IEmpleado[];

    @OneToMany(() => Servicio, servicio => servicio.empresa)
    servicio: IServicio[];
}
