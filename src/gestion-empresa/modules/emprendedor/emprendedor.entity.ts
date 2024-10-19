import {IUsuario} from "../../../auth/interfaces/usuario.interface";
import {Usuario} from "../../../auth/modules/usuario/usuario.entity";
import {IEmprendedor} from "../../interfaces/emprendedor.interface";
import {BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Empresa} from "src/gestion-empresa/modules/empresa/empresa.entity";
import {IEmpresa} from "src/gestion-empresa/interfaces/empresa.interface";

@Entity()
export class Emprendedor extends BaseEntity implements IEmprendedor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cuit: string;

    @Column()
    domicilio: string;

    @OneToOne(() => Usuario, usuario => usuario.empleado)
    usuario: IUsuario;

    @OneToOne(() => Empresa, empresa => empresa.emprendedor)
    @JoinColumn()
    empresa: IEmpresa;

}
