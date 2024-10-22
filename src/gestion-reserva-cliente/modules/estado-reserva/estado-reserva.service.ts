import { Injectable } from '@nestjs/common';
import { Reserva } from '../reserva/reserva.entity';
import { EstadoReserva } from './estado-reserva.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class EstadoReservaService {
    repository = EstadoReserva; 

    async buscarPorNombre(nombre: string): Promise<EstadoReserva> {
        return this.repository.findOne({where : {nombre} });
    }

    async registrar(estado: DeepPartial<EstadoReserva>): Promise<EstadoReserva> {
        return this.repository.save(estado);
    }
}
