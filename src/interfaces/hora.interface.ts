import { IHorario } from './horario.interface';
export interface IHora {
    id: number;
    startTime: string;
    endTime: string;
    horario: IHorario[];
    turno: ITurno[]  
  }