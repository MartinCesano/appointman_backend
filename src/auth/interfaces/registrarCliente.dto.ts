import { IsOptional, IsString, IsInt } from 'class-validator';
import { IUsuario } from './usuario.interface';

export class RegistrarClienteDTO{
    @IsOptional()
    @IsString()
    fechaNacimiento?: string | null;

    @IsInt()
    documento: number;
}