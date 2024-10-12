import { IsString, IsNumber, IsArray } from 'class-validator';
import { Hora } from 'src/gestion-reserva-cliente/modules/hora/hora.entity';

export class CreateHorarioDto {
    name: string;
    horas: Hora[];

}
