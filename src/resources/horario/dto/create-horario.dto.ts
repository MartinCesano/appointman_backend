import { IsString, IsNumber, IsArray } from 'class-validator';
import {Hora} from "../../hora/entities/hora.entity";

export class CreateHorarioDto {
    name: string;
    horas: Hora[];

}
