import { Injectable } from '@nestjs/common';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { RegistrarTipoServicioDTO } from './interfaces/registrarTipoServicio';
import { GestorRegistrarDisponibilidadService } from './use-cases/gestor-registrar-disponibilidad.service';
import { aplicarHorarioDTO } from './interfaces/aplicar-horario.dto';
import { IUsuario} from "../auth/interfaces/usuario.interface";

@Injectable()
export class GestionEmpresaService {
    constructor(
        private gestorRegistrarTipoServicioService: GestorRegistrarTipoServicioService, 
        private gestorRegistrarDisponibilidad: GestorRegistrarDisponibilidadService,
    ) {
    }

    async registrarTipoServicio(datos: RegistrarTipoServicioDTO, usuario: IUsuario) {
        return this.gestorRegistrarTipoServicioService.registrarTipoServicio(datos, usuario);
    }

    async registrarDisponibilidadAplicandoHorarioForzado(datos: aplicarHorarioDTO) {
        return this.gestorRegistrarDisponibilidad.registrarDisponibilidadAplicandoHorarioForzado(datos);
    }
}
