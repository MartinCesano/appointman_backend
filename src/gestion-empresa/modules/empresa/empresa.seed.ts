import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { EmpresaService } from './empresa.service';
import { Empresa } from './empresa.entity';
import { EmprendedorService } from '../emprendedor/emprendedor.service';
import { EmpleadoService } from '../empleado/empleado.service';

@Injectable()
export class EmpresaSeeder {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly emprendedorService: EmprendedorService,
    private readonly empleadoService: EmpleadoService,
  ) { }

  async seedEmpresas() {
    const empresas: DeepPartial<Empresa>[] = [
      {
        nombre: 'Coop AC',
        fotoPerfil: 'Foto de ejemplo 1',
        cuit: '31-56325584-2',
        domicilio: 'Calle River Plate',
        telefono: '1234567890',
        email: 'empresa1@example.com',
        descripcion: 'cooperativa de arroyo cabral',
        empleados: [
          await this.empleadoService.buscarPorCuil('23-45087673-9'),
          await this.empleadoService.buscarPorCuil('20-44433060-1'),
        ],
        emprendedor: await this.emprendedorService.buscarPorCuit('31-45087673-9'),

      },
      {
        nombre: 'Empresa Dos',
        fotoPerfil: 'https://example.com/foto2.jpg',
        cuit: '30-87654321-0',
        domicilio: 'Avenida Siempre Viva 742',
        telefono: '0987654321',
        email: 'empresa2@example.com',
        descripcion: 'Descripción de Empresa Dos',
      },
    ];

    for (const empresa of empresas) {
      const existingEmpresa = await this.empresaService.buscarPorCuit(empresa.cuit);
      if (!existingEmpresa) {
        await this.empresaService.registrar(empresa);
      }
    }
  }
}