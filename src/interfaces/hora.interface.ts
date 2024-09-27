import { IHorario } from './horario.interface';
import { ITurno } from './turno.interface';
export interface IHora {
    id: number;
    startTime: string;
    endTime: string;
    horario: IHorario[];
    turno: ITurno[];
  }