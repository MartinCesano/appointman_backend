import { Controller } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { GestorRegistrarTipoServicioService } from './gestor-registrar-tipo-servicio.service';
import { RegistrarTipoServicioDTO } from 'src/gestion-empresa/interfaces/registrarTipoServicio';


@Controller('gestor-registrar-tipo-servicio')
export class GestorRegistrarTipoServicioController {
    constructor(private service: GestorRegistrarTipoServicioService) {}
    //metodo para registrar un tipo de servicio

    @Post()
    async registrarTipoServicio(@Body() datos: RegistrarTipoServicioDTO) {
        return this.service.registrarTipoServicio(datos);
    }

}
