import { IUsuario } from "src/auth/interfaces/user.interface";
import { IEempresa } from "./empresa.interface";
export interface IEmprendedor extends IUsuario {
    empresa: IEempresa;   
}
