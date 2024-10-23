import {BadRequestException, Injectable} from '@nestjs/common';
import {Cliente} from './cliente.entity';
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

    async buscar(idCliente: number): Promise<Cliente> {
        return this.repository.findOne({
            where: { id: idCliente },
            relations: ['reservas'] 
        });
    }
    async buscarPorDocumento(documento: number): Promise<Cliente> {
        return this.repository.findOne({
            where: { documento: documento },
            relations: ['reservas'] 
        });
    }

    async actualizar(cliente: Cliente): Promise<Cliente> {
        return await this.repository.save(cliente);
    }





}
