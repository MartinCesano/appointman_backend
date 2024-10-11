import { IEmpleado } from "src/interfaces/empleado.interface";
import { IRol } from "./rol.interface";
import { ICliente } from "src/gestion-reserva-cliente/interfaces/cliente.interface";
import { IEmprendedor } from "src/interfaces/emprendedor.interface";

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
