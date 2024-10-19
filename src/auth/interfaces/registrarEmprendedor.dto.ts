import {IsEmail, IsNotEmpty, MinLength, IsString, IsPhoneNumber} from 'class-validator';
import {Column} from "typeorm";
import {IEmpresa} from "../../gestion-empresa/interfaces/empresa.interface";


export class RegistrarEmprendedorDTO {
    cuil: string;
    domicilio: string;
    idEmpresa: number;
    empresa: IEmpresa;
}
