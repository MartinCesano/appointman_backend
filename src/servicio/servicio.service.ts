import {Injectable} from '@nestjs/common';
import {CreateServicioDto} from './dto/create-servicio.dto';
import {UpdateServicioDto} from './dto/update-servicio.dto';
import {IServicio} from "../interfaces/servicio.interface";
import {ServicioEntity} from "./entities/servicio.entity";
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export class ServicioService {
    repository = ServicioEntity;
    constructor() {
    }

    create(nuevoServicio: DeepPartial<ServicioEntity>): Promise<ServicioEntity> {
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
