import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { EmpleadoService } from '../../../gestion-empresa/modules/empleado/empleado.service';
import { EmprendedorService } from '../../../gestion-empresa/modules/emprendedor/emprendedor.service';
import { UsuarioService } from '../../../auth/modules/usuario/usuario.service';
import { RegistrarClienteDTO } from '../../../auth/interfaces/registrarCliente.dto';

@Injectable()
export class ClienteSeeder {
  constructor(
    private readonly clienteService: ClienteService,
  ) {}

  async seedClientes() {
    const clientes: RegistrarClienteDTO[] = [
      {
        fechaNacimiento: '2003-05-08',
        documento: 319122018,
      }
    ];

    for (const cliente of clientes) {
      const existingCliente = await this.clienteService.buscarPorDocumento(cliente.documento);
      if (!existingCliente) {
        await this.clienteService.registrar(cliente);
      }
    }
  }
}