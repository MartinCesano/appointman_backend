import {Controller, Post, Body, Request, UseGuards, Get} from '@nestjs/common';
import {GestionEmpresaService} from './gestion-empresa.service';
import {RegistrarTipoServicioDTO} from './interfaces/registrarTipoServicio';
import {AuthGuard} from "../auth/guards/auth.guard";
import {RegistrarHorarioDTO} from "./interfaces/registrar-horario.dto";

@Controller('gestion-empresa')
export class GestionEmpresaController {
    constructor(private gestionEmpresaService: GestionEmpresaService) {
    }


    //#Region => GET Methods
    @UseGuards(AuthGuard)
    @Get('get-servicios')
    async obtenerServicios(@Request() req) {
        const usuario = req.user; // Accedemos al usuario responsable desde la request
        return this.gestionEmpresaService.getServicios(usuario);
    }

    @UseGuards(AuthGuard)
    @Get('horarios')
    async getHorarios(@Request() req) {
        const usuario = req.user; // Accedemos al usuario responsable desde la request
        return this.gestionEmpresaService.getHorarios(usuario);
    }





    //#Region => Post Methods
    @UseGuards(AuthGuard)
    @Post('registrar-tipo-servicio')
    async registrarTipoServicio(@Body() datos: RegistrarTipoServicioDTO, @Request() req) {
        const usuario = req.user; // Accedemos al usuario responsable desde la request
        return this.gestionEmpresaService.registrarTipoServicio(datos, usuario);
    }

    @Post('registrar-disponibilidad-aplicando-horario-forzado')
    async registrarDisponibilidadAplicandoHorarioForzado(@Body() datos: any) {
        return this.gestionEmpresaService.registrarDisponibilidadAplicandoHorarioForzado(datos);
    }

    @UseGuards(AuthGuard)
    @Post('registrar-horario')
    async registrarHorario(@Body() datos: RegistrarHorarioDTO, @Request() req) {
        const usuario = req.user; // Accedemos al usuario responsable desde la request
        return this.gestionEmpresaService.registrarHorario(datos, usuario);
    }



}
