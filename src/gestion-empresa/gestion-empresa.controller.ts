import {Controller, Post, Body, Request, UseGuards} from '@nestjs/common';
import {GestionEmpresaService} from './gestion-empresa.service';
import {RegistrarTipoServicioDTO} from './interfaces/registrarTipoServicio';
import {AuthGuard} from "../auth/guards/auth.guard";

@Controller('gestion-empresa')
export class GestionEmpresaController {
    constructor(private gestionEmpresaService: GestionEmpresaService) {
    }

    // @UseGuards(AuthGuard)
    @Post('registrar-tipo-servicio')
    async registrarTipoServicio(@Body() datos: RegistrarTipoServicioDTO, @Request() req) {
        // const usuario = req.user; // Accedemos al usuario responsable desde la request
        return this.gestionEmpresaService.registrarTipoServicio(datos);
    }

    @Post('registrar-disponibilidad-aplicando-horario-forzado')
    async registrarDisponibilidadAplicandoHorarioForzado(@Body() datos: any) {
        return this.gestionEmpresaService.registrarDisponibilidadAplicandoHorarioForzado(datos);
    }




}
