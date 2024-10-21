import { ITurno } from './turno.interface';
import { ICliente } from './cliente.interface';

export interface IReserva {
    id: number;
    fecha: string;
    turnos: ITurno[];
    cliente: ICliente;
}