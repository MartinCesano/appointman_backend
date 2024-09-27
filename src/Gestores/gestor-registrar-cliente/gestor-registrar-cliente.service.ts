import { Injectable } from '@nestjs/common';
import { RegistrarTipoServicioDTO } from './dto/registrarCliente.dto';
import { ClienteService} from "../../cliente/cliente.service";

@Injectable()
export class GestorRegistrarClienteService {
    constructor(private clienteService: ClienteService) {
    }


    async registrarCliente(datos: RegistrarTipoServicioDTO) {
        // Logica para validar que no exista otro cliente con el mismo correo electronico y que no exista otro cliente con el mismo numero de telefono
        // Logica para validar que el correo electronico sea valido


        //creo el cliente
        const response = await this.clienteService.create(datos);


        return response;
    }
}
