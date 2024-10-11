import {BadRequestException, Injectable} from '@nestjs/common';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {Cliente} from './entities/cliente.entity';
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
