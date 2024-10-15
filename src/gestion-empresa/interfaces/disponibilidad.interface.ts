import { IEmpleado } from "./empleado.interface";
import { IPrestadorServicio } from "./prestador-servicio.interface";

export interface IDisponibilidad {
    id: number;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    prestadorServicio: IPrestadorServicio;
}