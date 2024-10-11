<<<<<<< HEAD
import { IUsuario } from "src/auth/interfaces/user.interface";
export interface IEmpleado extends IUsuario {
    CUIT: string;   
=======
import { IServicio } from "./servicio.interface";

export interface IEmpleado {
    cuil: string;
    capacidades: IServicio[];
>>>>>>> d0f8ca3d88defd4915def4a354adf4d69e0ac5cf
}
