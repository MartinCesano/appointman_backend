import {BadRequestException, Injectable} from '@nestjs/common';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {Cliente} from './entities/cliente.entity';
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

    findAll() {
        return `This action returns all cliente`;
    }

    findOne(id: number) {
        return `This action returns a #${id} cliente`;
    }

    update(id: number, updateClienteDto: UpdateClienteDto) {
        return `This action updates a #${id} cliente`;
    }

    remove(id: number) {
        return `This action removes a #${id} cliente`;
    }
}
