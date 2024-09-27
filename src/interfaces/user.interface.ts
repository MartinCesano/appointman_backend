import { IRol } from "./rol.interface";

export interface IUsuario {
  id: number;
  email: string;
  telefono: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  roles: IRol[];
}
