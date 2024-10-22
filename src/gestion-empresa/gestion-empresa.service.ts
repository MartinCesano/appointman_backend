import { Injectable } from '@nestjs/common';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { RegistrarTipoServicioDTO } from './interfaces/registrarTipoServicio';
import { GestorRegistrarDisponibilidadService } from './use-cases/gestor-registrar-disponibilidad.service';
import { aplicarHorarioDTO } from './interfaces/aplicar-horario.dto';
import { IUsuario} from "../auth/interfaces/usuario.interface";
import {GestorObtenerServiciosService} from "./use-cases/gestor-obtener-servicios.service";
import {RegistrarHorarioDTO} from "./interfaces/registrar-horario.dto";
import {GestorABMHorariosService} from "./use-cases/gestor-ABM-horarios.service";
import {GestorObtenerPrestadorServicio} from "./use-cases/gestor-get-prestadorServicio.service";

@Injectable()
export class GestionEmpresaService {
    constructor(
        private gestorRegistrarTipoServicioService: GestorRegistrarTipoServicioService, 
        private gestorRegistrarDisponibilidad: GestorRegistrarDisponibilidadService,
        private gestorObtenerServiciosService: GestorObtenerServiciosService,
        private gestorABMHorariosService: GestorABMHorariosService,
        private gestorObtenerPrestadorServicio: GestorObtenerPrestadorServicio
    ) {
    }

    async registrarTipoServicio(datos: RegistrarTipoServicioDTO, usuario: IUsuario) {
        return this.gestorRegistrarTipoServicioService.registrarTipoServicio(datos, usuario);
    }

    async registrarDisponibilidadAplicandoHorarioForzado(datos: aplicarHorarioDTO) {
        return this.gestorRegistrarDisponibilidad.registrarDisponibilidadAplicandoHorarioForzado(datos);
    }

    async getServicios(usuario: IUsuario) {
        return this.gestorObtenerServiciosService.getServicios(usuario);
    }

    async registrarHorario(datos: RegistrarHorarioDTO, usuario: IUsuario) {
        return this.gestorABMHorariosService.registrarHorario(datos, usuario);
    }

    async getHorarios(usuario: IUsuario) {
        return this.gestorABMHorariosService.getHorarios(usuario);
    }

    async getPrestadorServicio(usuario: IUsuario) {
        return this.gestorObtenerPrestadorServicio.getPrestadorServicio(usuario);
    }



}
