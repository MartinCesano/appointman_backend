import { Injectable } from '@nestjs/common';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { RegistrarTipoServicioDTO } from './interfaces/registrarTipoServicio';
@Injectable()
export class GestionEmpresaService {
    constructor(private gestorRegistrarTipoServicioService: GestorRegistrarTipoServicioService) {
    }

    async registrarTipoServicio(datos: RegistrarTipoServicioDTO) {
        return this.gestorRegistrarTipoServicioService.registrarTipoServicio(datos);
    }
}
