import { IHora } from "./hora.interface";
export interface IHorario {
    id: number;
    name: string;
    horas: IHora[];
  }