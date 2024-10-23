import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { EmpleadoService } from './empleado.service';
import { Empleado } from './empleado.entity';
import { UsuarioService } from '../../../auth/modules/usuario/usuario.service';
import e from 'express';

@Injectable()
export class EmpleadoSeeder {
  constructor(
    private readonly empleadoService: EmpleadoService,
  ) { }

  async seedEmpleados() {
    const empleados: DeepPartial<Empleado>[] = [
      { cuil: "23-45087673-9" },
      { cuil: "20-44433060-1" },
    ];

    for (const empleado of empleados) {
      const existingRole = await this.empleadoService.buscarPorCuil(empleado.cuil);
      if (!existingRole) {
        await this.empleadoService.crear(empleado);
      }
    }
  }
}