import { Injectable } from '@nestjs/common';
import { GestorRegistrarReservaService } from './use-cases/gestor-registrar-reserva.service';
import { GestorCancelarReservaService } from './use-cases/gestor-cancelar-reserva.service';

@Injectable()
export class GestionReservaClienteService {
    constructor(
        private gestorRegistrarReservaService: GestorRegistrarReservaService,
        private gestorCancelarReservaService: GestorCancelarReservaService,
    ) {
    }

    async registrarReservaDeTurno(datos) {
        return this.gestorRegistrarReservaService.registrarReservaDeTurno(datos);
    }

    async cancelarReservaDeTurno(idReserva) {
        return this.gestorCancelarReservaService.cancelarReservaDeTurno(idReserva);
    }
}
