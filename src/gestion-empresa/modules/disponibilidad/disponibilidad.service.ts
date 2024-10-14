import { Injectable } from '@nestjs/common';
import { Disponibilidad } from './disponibilidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { IDisponibilidad } from 'src/gestion-empresa/interfaces/disponibilidad.interface';

@Injectable()
export class DisponibilidadService {
    constructor(
        @InjectRepository(Disponibilidad)
        private readonly disponibilidadRepository: Repository<Disponibilidad>,
    ) {}

    async registrar(disponibilidad: IDisponibilidad): Promise<IDisponibilidad> {
        return this.disponibilidadRepository.save(disponibilidad);
    }

    async actualizar(disponibilidad: IDisponibilidad): Promise<IDisponibilidad> {
        return this.disponibilidadRepository.save(disponibilidad);
    }

    async buscarDisponibilidad(empleadoId: number, fecha: string): Promise<Disponibilidad | null> {
        // Convertir la fecha a formato ISO
        const fechaISO = DateTime.fromISO(fecha).toISODate();
        
        return this.disponibilidadRepository.findOne({
            where: {
                empleado: { id: empleadoId },
                fecha: fechaISO,
            },
        });
    }
    
}
