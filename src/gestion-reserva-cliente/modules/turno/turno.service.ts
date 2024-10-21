import { Injectable } from '@nestjs/common';
import { Turno } from './turno.entity';
import { Hora } from '../hora/hora.entity';
import { Disponibilidad } from '../../../gestion-empresa/modules/disponibilidad/disponibilidad.entity';
import { Reserva } from '../reserva/entities/reserva.entity';

@Injectable()
export class TurnoService {
    repository = Turno;
    

    async registrar(turno: Turno): Promise<Turno> {
        return await this.repository.save(turno);
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
    
    async reservar(turno: Turno, reserva: Reserva): Promise<Turno> {
        turno.reserva = reserva;
        return this.repository.save(turno);
    }
}