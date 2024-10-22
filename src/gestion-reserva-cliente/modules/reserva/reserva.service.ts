import { Injectable } from '@nestjs/common';
import { Reserva } from './reserva.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {
    constructor(
        @InjectRepository(Reserva)
        private readonly repository: Repository<Reserva>,
    ) {}
  
    async registrar(reserva: Reserva): Promise<Reserva> {
        
        return await this.repository.save(reserva);
    }
}
