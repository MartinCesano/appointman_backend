import { IUsuario } from "src/auth/interfaces/usuario.interface";
import { Usuario } from "src/auth/modules/usuario/usuario.entity";
import { IEmprendedor } from "src/gestion-empresa/interfaces/emprendedor.interface";
import {BaseEntity, Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Emprendedor extends BaseEntity implements IEmprendedor {
    @PrimaryGeneratedColumn() 
    id:number;

    @Column() 
    cuit:string; 

    @Column()
    domicilio: string;

    @OneToOne(()=> Usuario, usuario => usuario.empleado)
    usuario:IUsuario;

}
