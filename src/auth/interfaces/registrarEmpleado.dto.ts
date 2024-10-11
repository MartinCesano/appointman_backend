import { IsEmail, IsNotEmpty, MinLength, IsString, IsPhoneNumber } from 'class-validator';


export class RegistrarEmpleadoDTO{
    cuil:string;
}