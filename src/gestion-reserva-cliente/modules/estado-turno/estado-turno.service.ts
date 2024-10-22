import { Injectable } from '@nestjs/common';
import { EstadoTurno } from './estado-turno.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class EstadoTurnoService {
    repository = EstadoTurno; 

    async buscarPorNombre(nombre: string): Promise<EstadoTurno> {
        return await this.repository.findOne({ where: { nombre } });
    }

    async registrar(estadoTurno: DeepPartial<EstadoTurno>): Promise<EstadoTurno> {
        return await this.repository.save(estadoTurno);
    }
}
