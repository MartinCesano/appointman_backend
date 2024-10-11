import { IsEmail, IsNotEmpty, MinLength, IsString, IsPhoneNumber } from 'class-validator';
import {Column} from "typeorm";

export class RegistrarEmprendedorDTO{
    cuil:string;

    domicilio: string;
}
