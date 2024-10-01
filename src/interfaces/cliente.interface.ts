import { IUsuario } from './../auth/interfaces/user.interface';

export interface ICliente extends IUsuario {
    id: number;
    fechaNacimiento?: string | null;
    genero: string;
}
