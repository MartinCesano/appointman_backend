import { Injectable } from '@nestjs/common';
import { GestorRegistrarReservaService } from './use-cases/gestor-registrar-reserva.service';

@Injectable()
export class GestionReservaClienteService {
    constructor(private gestorRegistrarClienteService: GestorRegistrarReservaService) {
    }


    async registrarReservaDeTurno(datos) {
        return this.gestorRegistrarClienteService.registrarReservaDeTurno(datos);
    }
}
