import { Injectable } from '@nestjs/common';
import { RegistrarClienteDTO } from '../interfaces/registrarCliente.dto';
import { ClienteService } from '../modules/cliente/cliente.service';
import { hashSync, compareSync } from 'bcrypt';


@Injectable()
export class GestorRegistrarClienteService {
    constructor(private clienteService: ClienteService) {
    }


    async registrarCliente(datos: RegistrarClienteDTO) {
        // Logica para validar que no exista otro cliente con el mismo correo electronico y que no exista otro cliente con el mismo numero de telefono
        // Logica para validar que el correo electronico sea valido
        
        // haseamos la contraseña
        datos.contrasena = hashSync(datos.contrasena, 10);

        //creo el cliente
        const response = await this.clienteService.create(datos);


        return response;
    }
}
