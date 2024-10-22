import { Injectable } from '@nestjs/common';
import { Reserva } from './reserva.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoReserva } from '../estado-reserva/estado-reserva.entity';

@Injectable()
export class ReservaService {
    constructor(
        @InjectRepository(Reserva)
        private readonly repository: Repository<Reserva>,
    ) {}
  
    async registrar(reserva: Reserva): Promise<Reserva> {
        return await this.repository.save(reserva);
    }

    async buscar(id: number): Promise<Reserva> {
        return await this.repository.findOne({where: {id}});
    }

    async setEstado(reserva: Reserva, estado: EstadoReserva): Promise<Reserva> {
        reserva.estadoReserva = estado;
        return await this.repository.save(reserva);
    }

    async actualizar(reserva: Reserva): Promise<Reserva> {
        return await this.repository.save(reserva);
    }
}
