import {Injectable} from '@nestjs/common';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {Cliente} from './entities/cliente.entity';
import {DeepPartial, } from 'typeorm';


@Injectable()
export class ClienteService {
    repository = Cliente;

    constructor(
        ) {
    }

    registrar(nuevoCliente: DeepPartial<Cliente>): Promise<Cliente> {
        try {
            return this.repository.save(nuevoCliente);
        } catch (error) {
            throw new Error(`Error creating cliente: ${error.message}`);
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