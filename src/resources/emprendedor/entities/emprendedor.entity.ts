import { IUsuario } from "src/auth/interfaces/usuario.interface";
import { Usuario } from "../../../auth/modules/usuario/usuario.entity";
import { IEmprendedor } from "src/interfaces/emprendedor.interface";
import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Emprendedor implements IEmprendedor {
    @PrimaryGeneratedColumn() 
    id:number; 

    @Column() 
    nombre: string;

    @Column() 
    cuit:string; 

    @Column()
    domicilio: string;

    @OneToOne(()=> Usuario, usuario => usuario.empleado)
    usuario:IUsuario;

}
