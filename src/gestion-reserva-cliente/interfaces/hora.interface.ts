import { IHorario } from './horario.interface';
import { ITurno } from './turno.interface';
export interface IHora {
  id: number;
  horaInicio: string; // Se espera en formato "HH:mm"
  horaFin: string; // Se espera en formato "HH:mm"
  horarios: IHorario[];
  turnos: ITurno[];
}