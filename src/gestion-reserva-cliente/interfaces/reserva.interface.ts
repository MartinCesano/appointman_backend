import { IServicio } from "src/interfaces/servicio.interface";
export interface IReserva {
    horaInicio: string;
    fecha: Date;
    tiempoTotal: number;
    servicio: IServicio[];
}
