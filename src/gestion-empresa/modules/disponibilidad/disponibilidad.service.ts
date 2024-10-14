import { Injectable } from '@nestjs/common';
import { Disponibilidad } from './disponibilidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { IDisponibilidad } from 'src/gestion-empresa/interfaces/disponibilidad.interface';

@Injectable()
export class DisponibilidadService {
    repository = Disponibilidad


    async registrar(disponibilidad: Disponibilidad): Promise<Disponibilidad> {
        return this.repository.save(disponibilidad);
    }

    async actualizar(disponibilidad: Disponibilidad): Promise<Disponibilidad> {
        return this.repository.save(disponibilidad);
    }

    async buscarDisponibilidad(empleadoId: number, fecha: string): Promise<Disponibilidad | null> {
        // Convertir la fecha a formato ISO
        const fechaISO = DateTime.fromISO(fecha).toISODate();
        
        return this.repository.findOne({
            where: {
                empleado: { id: empleadoId },
                fecha: fechaISO,
            },
        });
    }
    
}
