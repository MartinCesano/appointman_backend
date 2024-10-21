
import { IEmpleado } from "./empleado.interface";
import { IPrestadorServicio } from "./prestador-servicio.interface";
import { ISucursal } from "./sucursal.interface";
import { IServicio } from "./servicio.interface";
import {IHorario} from "../../gestion-reserva-cliente/interfaces/horario.interface";


export interface IEmpresa {
    id: number;
    nombre: string;
    fotoPerfil: string;
    cuit: string;
    domicilio: string;
    prestadores:IPrestadorServicio[]; 
    empleados: IEmpleado[]; 
    sucursales: ISucursal[];
    servicio: IServicio[];
    horario?: IHorario[];


}
    
