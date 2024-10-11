import { Controller } from '@nestjs/common';
import { GestionReservaClienteService } from './gestion-reserva-cliente.service';

@Controller('gestion-reserva-cliente')
export class GestionReservaClienteController {
    constructor(private gestionReservaClienteService: GestionReservaClienteService) {}

    // @Post("registrar-cliente")
    // registrarCliente(@Body() datos: RegistrarClienteDTO) {
    //     return this.gestionReservaClienteService.registrarCliente(datos);
    // }
}