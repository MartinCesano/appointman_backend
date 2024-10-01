import { IPermiso } from "./permisos.interface";

export interface IRol {
    id: number;
    nombre: string;
    permisos: IPermiso[];
    description: string;
}
