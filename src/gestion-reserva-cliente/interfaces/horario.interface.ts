import { IHora } from "./hora.interface";
export interface IHorario {
  id: number;
  nombre: string;
  horaInicio: string;
  horaFin: string;
  horas: IHora[];
}