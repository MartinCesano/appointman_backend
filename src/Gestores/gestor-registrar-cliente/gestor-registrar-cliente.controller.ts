import { Controller } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { RegistrarTipoServicioDTO } from './dto/registrarCliente.dto';
import { GestorRegistrarClienteService } from './gestor-registrar-cliente.service';

@Controller('gestor-registrar-cliente')
export class GestorRegistrarClienteController {
    constructor(private service: GestorRegistrarClienteService) {}

    @Post()
    registrarCliente(@Body() datos: RegistrarTipoServicioDTO) {
        return this.service.registrarCliente(datos);
    }


}
