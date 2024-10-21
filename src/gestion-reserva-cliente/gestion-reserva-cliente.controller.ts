import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { registrarReservaDeTurnoDTO } from './interfaces/registrarReservaTurno.dto';
import { GestionReservaClienteService } from './gestion-reserva-cliente.service';

@Controller('gestion-reserva-cliente')
export class GestionReservaClienteController {
    constructor(private gestionReservaClienteService: GestionReservaClienteService) {}


    @Post("registrar-reserva-de-turno")
    registrarReservaDeTurno(@Body() body: registrarReservaDeTurnoDTO) {
        return this.gestionReservaClienteService.registrarReservaDeTurno(body);
    }
}