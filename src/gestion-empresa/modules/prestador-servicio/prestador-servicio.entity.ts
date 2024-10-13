import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Servicio } from "../servicio/servicio.entity";
import { IEmpresa } from "src/gestion-empresa/interfaces/empresa.interface";
import { Empresa } from "../empresa/empresa.entity";

@Entity()
export class PrestadorServicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @ManyToMany(() => Servicio, servicio => servicio.prestadores)
    @JoinTable()
    servicios: Servicio[];

    @OneToMany(() => Empresa, empresa => empresa.prestadores)
    empresa: IEmpresa;
}
