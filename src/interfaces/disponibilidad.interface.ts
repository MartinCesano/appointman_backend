import { IEmpleado } from "./empleado.interface";

export interface IDisponibilidad {
    id: number;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    empleado: IEmpleado;
}