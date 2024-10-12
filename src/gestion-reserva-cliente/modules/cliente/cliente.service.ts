import {BadRequestException, Injectable} from '@nestjs/common';
import {Cliente} from './cliente.entity';
import {DeepPartial, } from 'typeorm';
import {RegistrarClienteDTO} from "../../../auth/interfaces/registrarCliente.dto";


@Injectable()
export class ClienteService {
    repository = Cliente;

    constructor(
        ) {
    }

    registrar(nuevoCliente: RegistrarClienteDTO): Promise<Cliente> {
        try {
            const newCliente = new Cliente();
            Object.assign(newCliente, nuevoCliente);
            return this.repository.save(newCliente);
        } catch (error) {
            throw new BadRequestException(`Error creating cliente: ${error.message}`);
        }
    }


}
