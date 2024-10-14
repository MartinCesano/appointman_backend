import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './turno.entity';
import { Hora } from '../hora/hora.entity';
import { ITurno } from 'src/gestion-reserva-cliente/interfaces/turno.interface';
import { IHora } from 'src/gestion-reserva-cliente/interfaces/hora.interface';
import { Disponibilidad } from 'src/gestion-empresa/modules/disponibilidad/disponibilidad.entity';

@Injectable()
export class TurnoService {
    repository = Turno;
    

    async registrar(turno: Turno): Promise<Turno> {
        return this.repository.save(turno);
    }

    async buscar(id: number): Promise<Turno> {
        return this.repository.findOne({ where: { id } });
    }

    async setHora(id: number, hora: Hora): Promise<void> {
        const turno = await this.buscar(id);
        if (!turno) {
            throw new Error('Turno not found');
        }
        turno.hora = hora;
        await this.repository.save(turno);
    }

    async borrar(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async setDispobibilidad(id: number, disponibilidad: Disponibilidad): Promise<Turno> {
        const turno = await this.buscar(id);
        if (!turno) {
            throw new Error('Turno not found');
        }
        turno.disponibilidad = disponibilidad;
        return this.repository.save(turno);
    }           
}