import { Injectable } from '@nestjs/common';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { RegistrarTipoServicioDTO } from './interfaces/registrarTipoServicio';
import { GestorRegistrarDisponibilidadService } from './use-cases/gestor-registrar-disponibilidad.service';
import { aplicarHorarioDTO } from './interfaces/aplicar-horario.dto';
@Injectable()
export class GestionEmpresaService {
    constructor(
        private gestorRegistrarTipoServicioService: GestorRegistrarTipoServicioService, 
        private gestorRegistrarDisponibilidad: GestorRegistrarDisponibilidadService,
    ) {
    }

    async registrarTipoServicio(datos: RegistrarTipoServicioDTO) {
        return this.gestorRegistrarTipoServicioService.registrarTipoServicio(datos);
    }

    async registrarDisponibilidadAplicandoHorarioForzado(datos: aplicarHorarioDTO) {
        return this.gestorRegistrarDisponibilidad.registrarDisponibilidadAplicandoHorarioForzado(datos);
    }
}
