import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { RegistrarClienteDTO } from './interfaces/registrarCliente.dto';
import { GestionReservaClienteService } from './gestion-reserva-cliente.service';

@Controller('gestion-reserva-cliente')
export class GestionReservaClienteController {
    constructor(private gestionReservaClienteService: GestionReservaClienteService) {}

    @Post("registrar-cliente")
    registrarCliente(@Body() datos: RegistrarClienteDTO) {
        return this.gestionReservaClienteService.registrarCliente(datos);
    }
}