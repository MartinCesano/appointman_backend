import { Injectable } from '@nestjs/common';
import { ClienteService } from '../modules/cliente/cliente.service';

@Injectable()
export class GestorRegistrarClienteService {
    constructor(private clienteService: ClienteService) {
    }

}
