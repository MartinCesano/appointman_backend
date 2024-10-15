
import { IServicio } from "./servicio.interface";

export interface IEmpleado {
    id: number;
    cuil: string;
    capacidades: IServicio[];
}
