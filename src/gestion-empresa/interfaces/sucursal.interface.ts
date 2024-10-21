import {IHorario} from "../../gestion-reserva-cliente/interfaces/horario.interface";

export interface ISucursal {
    id: number;
    nombre: string;
    domicilio: string;
    horario?: IHorario[];
    
}