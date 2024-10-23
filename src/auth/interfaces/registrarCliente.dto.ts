import { IsOptional, IsString, IsInt } from 'class-validator';

export class RegistrarClienteDTO{
    @IsOptional()
    @IsString()
    fechaNacimiento?: string | null;

    @IsInt()
    documento: number;
}