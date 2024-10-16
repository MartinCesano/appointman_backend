import { IHorario } from './horario.interface';
import { ITurno } from './turno.interface';
import { DateTime } from 'luxon';

export interface IHora {
  id: number;
  horaInicio: DateTime; // Se espera en formato "HH:mm"
  horaFin: DateTime; // Se espera en formato "HH:mm"
  horarios: IHorario[];
  turnos: ITurno[];
}