import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { EmprendedorService } from '../emprendedor/emprendedor.service';
import { Emprendedor } from '../emprendedor/emprendedor.entity';
import { UsuarioService } from '../../../auth/modules/usuario/usuario.service';

@Injectable()
export class EmprendedorSeeder {
  constructor(
    private readonly emprendedorService: EmprendedorService,
  ) {}

  async seedEmprendedores() {
    const emprendedores: DeepPartial<Emprendedor>[] = [
      { cuit: "31-45087673-9",domicilio: "Oficina central de Gaido" },
    ];

    for (const emprendedor of emprendedores) {
      const existingEmprendedor = await this.emprendedorService.buscarPorCuit(emprendedor.cuit);
      if (!existingEmprendedor) {
        await this.emprendedorService.crear(emprendedor);
      }
    }
  }
}