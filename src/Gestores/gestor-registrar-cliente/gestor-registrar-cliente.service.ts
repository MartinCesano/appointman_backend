import { Injectable } from '@nestjs/common';
import { RegistrarClienteDTO } from './dto/registrarCliente.dto';
import { ClienteService } from '../../resources/cliente/cliente.service';

@Injectable()
export class GestorRegistrarClienteService {
    constructor(private clienteService: ClienteService) {
    }


    async registrarCliente(datos: RegistrarClienteDTO) {
        // Logica para validar que no exista otro cliente con el mismo correo electronico y que no exista otro cliente con el mismo numero de telefono
        // Logica para validar que el correo electronico sea valido

        //creo el cliente
        const response = await this.clienteService.create(datos);


        return response;
    }
}
