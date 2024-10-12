import {BaseEntity, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Sucursal} from "../sucursal/sucursal.entity";
import {IEmpresa} from "src/gestion-empresa/interfaces/empresa.interface";
import {Empleado} from "../empleado/empleado.entity";
import {IEmpleado} from "src/gestion-empresa/interfaces/empleado.interface";

@Entity("empresa")
export class Empresa extends BaseEntity implements IEmpresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

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

    @OneToMany(() => Empleado, empleado => empleado.empresa)
    empleados?: IEmpleado[];

}
