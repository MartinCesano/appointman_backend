import {Injectable} from '@nestjs/common';
import {Servicio} from "./servicio.entity";
import {DeepPartial, Repository} from 'typeorm';
import {IServicio} from "../../interfaces/servicio.interface";

@Injectable()
export class ServicioService {
    repository = Servicio;
    constructor() {
    }

    create(nuevoServicio: IServicio): Promise<Servicio> {
        try {
            const servicio = new Servicio();
            servicio.nombre = nuevoServicio.nombre;
            servicio.descripcion = nuevoServicio.descripcion;
            servicio.precio = nuevoServicio.precio;
            servicio.duracion = nuevoServicio.duracion;
            servicio.sucursales = []
            servicio.sucursales.push(nuevoServicio.sucursal[0]);
            return this.repository.save(servicio);
        } catch (error) {
            throw new Error(`Error creating servicio: ${error.message}`);
        }
    }

}
