import { IHora } from "./hora.interface";
export interface IHorario {
  id: number;
  nombre: string;
  horas: IHora[];
}