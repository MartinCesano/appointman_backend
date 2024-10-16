import { Injectable } from '@nestjs/common';
import { Disponibilidad } from './disponibilidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { IDisponibilidad } from 'src/gestion-empresa/interfaces/disponibilidad.interface';
import { Turno } from 'src/gestion-reserva-cliente/modules/turno/turno.entity';

@Injectable()
export class DisponibilidadService {
    repository = Disponibilidad


    async registrar(disponibilidad: Disponibilidad): Promise<Disponibilidad> {
        return this.repository.save(disponibilidad);
    }

    async actualizar(disponibilidad: Disponibilidad): Promise<Disponibilidad> {
        return this.repository.save(disponibilidad);
    }

    async buscarDisponibilidad(prestadorId: number, fecha: string): Promise<Disponibilidad | null> {
        // Convertir la fecha a formato ISO
        const fechaISO = DateTime.fromISO(fecha).toISODate();
        
        return this.repository.findOne({
            where: {
                prestadorServicio: { id: prestadorId },
                fecha: fechaISO,
            },
        });
    }

    async agregarTurno(disponibilidad: Disponibilidad, turno: Turno): Promise<Disponibilidad> {
        turno.disponibilidad = disponibilidad;
        disponibilidad.turnos.push(turno);
        return this.repository.save(disponibilidad);
    }
    
}
