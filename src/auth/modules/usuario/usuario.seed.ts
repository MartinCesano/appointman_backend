import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { EmpleadoService } from '../../../gestion-empresa/modules/empleado/empleado.service';
import { EmprendedorService } from '../../../gestion-empresa/modules/emprendedor/emprendedor.service';
import { ClienteService } from '../../../gestion-reserva-cliente/modules/cliente/cliente.service';

@Injectable()
export class UsuarioSeeder {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly empleadoService: EmpleadoService,
    private readonly emprendedorService: EmprendedorService,
    private readonly clienteService: ClienteService,
  ) {}

  async seedUsuarios() {
    const usuarios: DeepPartial<Usuario>[] = [
        {
            email: 'cesano305@gmail.com',
            contrasena: 'cesano1234',
            nombre: 'Martin',
            apellido: 'Cesano',
            telefono: '1234567890',
            empleado: await this.empleadoService.buscarPorCuil('20-44433060-1'),

          },
          {
            email: 'martingaido@gmail.com',
            contrasena: '12345678',
            nombre: 'Martin',
            apellido: 'Gaido',
            telefono: '3533499701',
            empleado: await this.empleadoService.buscarPorCuil('23-45087673-9'),
            emprendedor: await this.emprendedorService.buscarPorCuit('31-45087673-9'),
          },
          {
            email: 'presu@gmail.com',	
            contrasena: 'piti912',
            nombre: 'Matias',
            apellido: 'Presu',
            telefono: '319122018',
            cliente: await this.clienteService.buscarPorDocumento(319122018),
          }
          

    ];

    for (const usuario of usuarios) {
      const existingRole = await this.usuarioService.buscarPorEmail(usuario.email);
      if (!existingRole) {
        await this.usuarioService.registrar(usuario);
      }
    }
  }
}