import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { GestionEmpresaService } from './gestion-empresa.service';
import { RegistrarTipoServicioDTO } from './interfaces/registrarTipoServicio';

@Controller('gestion-empresa')
export class GestionEmpresaController {
    constructor(private gestionEmpresaService: GestionEmpresaService) {}

    @Post('registrar-tipo-servicio')
    async registrarTipoServicio(@Body() datos: RegistrarTipoServicioDTO) {
        return this.gestionEmpresaService.registrarTipoServicio(datos);
    }

    @Post('registrar-disponibilidad-aplicando-horario-forzado')
    async registrarDisponibilidadAplicandoHorarioForzado(@Body() datos: any) {
        return this.gestionEmpresaService.registrarDisponibilidadAplicandoHorarioForzado(datos);
    }

    
    

}
