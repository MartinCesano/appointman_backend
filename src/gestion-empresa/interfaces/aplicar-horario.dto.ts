
import {DateTime} from 'luxon';

export class aplicarHorarioDTO {
    horarioId: number;
    prestadorId: number;
    fechaInicio: DateTime;
    fechaFin: DateTime;
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
}