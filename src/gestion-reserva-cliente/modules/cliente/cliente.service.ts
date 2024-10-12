import {BadRequestException, Injectable} from '@nestjs/common';
import {Cliente} from './cliente.entity';
import {DeepPartial, } from 'typeorm';
import {RegistrarClienteDTO} from "../../../auth/interfaces/registrarCliente.dto";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente) // Inyecta el repositorio de Cliente
        private readonly repository: Repository<Cliente>,
    ) {}

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
