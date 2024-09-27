import { Module } from '@nestjs/common';
import {GestorRegistrarTipoServicioController} from "./gestor-registrar-tipo-servicio.controller";
import {GestorRegistrarTipoServicioService} from "./gestor-registrar-tipo-servicio.service";
import {ServicioService} from "../servicio/servicio.service";

@Module({
    controllers: [GestorRegistrarTipoServicioController],
    providers: [GestorRegistrarTipoServicioService, ServicioService],
    imports: []
})
export class GestorRegistrarTipoServicioModule {}
