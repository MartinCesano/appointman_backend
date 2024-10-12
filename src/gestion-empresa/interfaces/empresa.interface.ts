
import { IEmpleado } from "./empleado.interface";
import { IPrestadorServicio } from "./prestador-servicio.interface";
import { ISucursal } from "./sucursal.interface";

export interface IEmpresa {
    id: number;
    nombre: string;
    fotoPerfil: string;
    cuit: string;
    domicilio: string;
    prestadores:IPrestadorServicio[]; 
    empleados: IEmpleado[]; 
    sucursales: ISucursal[];
    
}
    
