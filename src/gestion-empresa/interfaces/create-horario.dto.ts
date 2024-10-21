import { Hora } from '../../gestion-reserva-cliente/modules/hora/hora.entity';

export class CreateHorarioDto {
    nombre: string;
    horaInicio: string;
    horaFin: string;
    diasActivos: string;
    horas?: Hora[];
}
