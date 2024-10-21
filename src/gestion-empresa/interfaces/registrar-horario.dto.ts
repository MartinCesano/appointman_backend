
import {DateTime} from 'luxon';

export class RegistrarHorarioDTO {
    nombre: string;
    horaInicio: string;
    horaFin: string;
    diasActivos: string[];
}