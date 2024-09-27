import { IServicio } from './servicio.interface';
export interface IReserva {
    horaInicio: string;
    fecha: Date;
    tiempoTotal: number;
    servicio: IServicio[];
}
