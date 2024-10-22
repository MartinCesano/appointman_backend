import { Injectable } from '@nestjs/common';
import { EstadoTurnoService } from '../modules/estado-turno/estado-turno.service';
import { TurnoService } from '../modules/turno/turno.service';
import { EstadoReservaService } from '../modules/estado-reserva/estado-reserva.service';
import { ReservaService } from '../modules/reserva/reserva.service';

@Injectable()
export class GestorCancelarReservaService {
    constructor(
        private readonly reservaService: ReservaService,
        private readonly estadoReservaService: EstadoReservaService,
        private readonly turnoService: TurnoService,
        private readonly estadoTurnoService: EstadoTurnoService,
    ) {}

    async cancelarReservaDeTurno(idReserva: number) {
        const reserva = await this.reservaService.buscar(idReserva);
        if (!reserva) {
            throw new Error(`Reserva con ID ${idReserva} no encontrada`);
        }
        
        for (const turno of reserva.turnos) {
            const estadoDisponibleTurno = await this.estadoTurnoService.buscarPorNombre('disponible');
            await this.turnoService.setEstado(turno, estadoDisponibleTurno);
        }
        const estadoCanceladoReserva = await this.estadoReservaService.buscarPorNombre('cancelado');
        return await this.reservaService.setEstado(reserva, estadoCanceladoReserva);
    }	
}
