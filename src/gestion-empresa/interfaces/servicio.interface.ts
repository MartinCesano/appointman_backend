import { IEmpresa } from './empresa.interface';
export interface IServicio {
    nombre: string;
    precio: number;
    duracion: number;
    descripcion?: string | null;
    empresa: IEmpresa;

}
