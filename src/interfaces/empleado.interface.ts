import { IUsuario } from "src/auth/interfaces/user.interface";
export interface IEmpleado extends IUsuario {
    CUIT: string;   
}
