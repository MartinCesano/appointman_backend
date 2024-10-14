import { IDisponibilidad } from "src/gestion-empresa/interfaces/disponibilidad.interface";
import { IHora } from "./hora.interface";
export interface ITurno {
  id: number;
  hora: IHora;
  disponibilidad: IDisponibilidad;
}
