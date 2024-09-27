import {Injectable} from '@nestjs/common';
import {UpdateServicioDto} from './dto/update-servicio.dto';
import {Servicio} from "./entities/servicio.entity";
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

    findAll() {
        return `This action returns all servicio`;
    }

    findOne(id: number) {
        return `This action returns a #${id} servicio`;
    }

    update(id: number, updateServicioDto: UpdateServicioDto) {
        return `This action updates a #${id} servicio`;
    }

    remove(id: number) {
        return `This action removes a #${id} servicio`;
    }
}
