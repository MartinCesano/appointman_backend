import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './turno.entity';
import { Hora } from '../hora/hora.entity';
import { ITurno } from 'src/gestion-reserva-cliente/interfaces/turno.interface';
import { IHora } from 'src/gestion-reserva-cliente/interfaces/hora.interface';

@Injectable()
export class TurnoService {
    constructor(
        @InjectRepository(Turno)
        private readonly turnoRepository: Repository<Turno>,
    ) {}

    async registrar(turno: ITurno): Promise<Turno> {
        return this.turnoRepository.save(turno);
    }

    async buscar(id: number): Promise<Turno> {
        return this.turnoRepository.findOne({ where: { id } });
    }

    async setHora(id: number, hora: Hora): Promise<void> {
        const turno = await this.buscar(id);
        if (!turno) {
            throw new Error('Turno not found');
        }
        turno.hora = hora;
        await this.turnoRepository.save(turno);
    }

    async borrar(id: number): Promise<void> {
        await this.turnoRepository.delete(id);
    }
}