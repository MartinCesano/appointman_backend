import { IServicio } from "./servicio.interface";


export interface IPrestadorServicio {
    id:number; 
    nombre:string;
    servicios: IServicio[];
}