import {Injectable} from '@nestjs/common';
import {CreateClienteDto} from './dto/create-cliente.dto';
import {UpdateClienteDto} from './dto/update-cliente.dto';
import {ICliente} from "../../interfaces/cliente.interface";
import {ClienteEntity} from './entities/cliente.entity';
import {DeepPartial, Repository} from 'typeorm';
import {UsuarioService} from "../../auth/modules/usuario/usuario.service";


@Injectable()
export class ClienteService extends UsuarioService {
    repository = ClienteEntity;

    constructor(
        private usuarioService: UsuarioService
        ) {
        super(usuarioService['permissionsService'], usuarioService['jwtService'], usuarioService['rolesService']);
    }

    create(nuevoCliente: DeepPartial<ClienteEntity>): Promise<ClienteEntity> {
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
