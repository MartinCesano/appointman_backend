import { IEmpleado } from "src/gestion-empresa/interfaces/empleado.interface";
import { IRol } from "./rol.interface";
import { ICliente } from "src/gestion-reserva-cliente/interfaces/cliente.interface";
import { IEmprendedor } from "src/gestion-empresa/interfaces/emprendedor.interface";

export interface IUsuario {
  id: number;
  email?: string;
  telefono: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  roles: IRol[];
  empleado?: IEmpleado; 
  cliente?: ICliente; 
  emprendedor?: IEmprendedor;
}
