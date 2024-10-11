import { Injectable } from '@nestjs/common';
import { RolService } from './rol.service';
import { DeepPartial } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolSeeder {
  constructor(private readonly rolService: RolService) {}

  async seedRoles() {
    const roles: DeepPartial<Rol>[] = [
      { nombre: 'Cliente', description: 'Usuario de la pagina que solo reserva turnos' },
      { nombre: 'Empleado', description: 'Usuario de la pagina que brinda servicios a una empresa y gestiona sus horarios' },
      { nombre: 'Emprendedor', description: 'Usuario de la pagina propietario de una empresa' },
      { nombre: 'Admin', description: 'Usuario de la pagina con permisos de administrador' },

    ];

    for (const role of roles) {
      const existingRole = await this.rolService.buscarRolPorNombre(role.nombre);
      if (!existingRole) {
        await this.rolService.createRoles(role);
      }
    }
  }
}