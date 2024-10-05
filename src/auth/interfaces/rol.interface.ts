import { IPermiso } from "./permisos.interface";

export interface IRol {
    codigo: number;
    nombre: string;
    permisos: IPermiso[];
    description: string;
}
