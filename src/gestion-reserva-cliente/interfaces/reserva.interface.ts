import { IServicio } from "src/gestion-empresa/interfaces/servicio.interface";
export interface IReserva {
    horaInicio: string;
    fecha: Date;
    tiempoTotal: number;
    servicio: IServicio[];
}
