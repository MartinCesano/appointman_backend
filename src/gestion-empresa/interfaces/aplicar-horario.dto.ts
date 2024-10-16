
import {DateTime} from 'luxon';

export class aplicarHorarioDTO {
    horarioId: number;
    prestadorId: number;
    fechaInicio: DateTime;
    fechaFin: DateTime;
}