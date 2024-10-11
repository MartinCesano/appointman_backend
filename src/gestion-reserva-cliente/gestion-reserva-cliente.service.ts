import { Injectable } from '@nestjs/common';
import { GestorRegistrarClienteService } from './use-cases/gestor-registrar-cliente.service';

@Injectable()
export class GestionReservaClienteService {
    constructor(private gestorRegistrarClienteService: GestorRegistrarClienteService) {
    }

    // async registrarCliente(datos) {
    //     return this.gestorRegistrarClienteService.registrarCliente(datos);
    // }
}
