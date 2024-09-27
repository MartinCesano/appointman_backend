import { UserI } from './user.interface';

export interface ICliente extends UserI {
    telefono: number;
    fechaNacimiento?: string | null;
    genero: string;
    documento?: number | null;
}
