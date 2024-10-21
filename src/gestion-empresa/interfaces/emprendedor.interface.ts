
import { IEmpleado } from "./empleado.interface";
import { IEmpresa } from "./empresa.interface";


export interface IEmprendedor { 
    id: number; 
    cuit: string;
    domicilio: string;
    empresa: IEmpresa;
}
