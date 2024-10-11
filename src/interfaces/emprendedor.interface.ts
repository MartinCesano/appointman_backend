<<<<<<< HEAD
import { IUsuario } from "src/auth/interfaces/user.interface";
import { IEempresa } from "./empresa.interface";
export interface IEmprendedor extends IUsuario {
    empresa: IEempresa;   
}
=======
import { IEmpleado } from "./empleado.interface";
import { IEmpresa } from "./empresa.interface";

export interface IEmprendedor { 
    id: number; 
    nombre: string;
    cuit: string;
    domicilio: string;
    // empresa: IEmpresa;
}
>>>>>>> d0f8ca3d88defd4915def4a354adf4d69e0ac5cf
