import {Injectable} from '@nestjs/common';
import {Servicio} from "./servicio.entity";
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export class ServicioService {
    repository = Servicio;
    constructor() {
    }

    create(nuevoServicio: DeepPartial<Servicio>): Promise<Servicio> {
        try {
            return this.repository.save(nuevoServicio);
        } catch (error) {
            throw new Error(`Error creating servicio: ${error.message}`);
        }
    }

}
