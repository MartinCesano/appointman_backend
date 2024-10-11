import { Injectable } from '@nestjs/common';
import { RegistrarClienteDTO } from '../interfaces/registrarCliente.dto';
import { ClienteService } from '../modules/cliente/cliente.service';
import { hashSync, compareSync } from 'bcrypt';


@Injectable()
export class GestorRegistrarClienteService {
    constructor(private clienteService: ClienteService) {
    }

}
