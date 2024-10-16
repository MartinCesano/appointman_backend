import { ISucursal } from './sucursal.interface';
export interface IServicio {
    nombre: string;
    precio: number;
    duracion: number;
    descripcion?: string | null;
    sucursal?: ISucursal[];
}
