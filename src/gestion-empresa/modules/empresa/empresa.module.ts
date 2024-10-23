import { forwardRef, Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaSeeder } from './empresa.seed';
import { EmpleadoModule } from '../empleado/empleado.module';
import { EmprendedorModule } from '../emprendedor/emprendedor.module';

@Module({
  controllers: [],
  providers: [EmpresaService, EmpresaSeeder],
  exports: [EmpresaService], 
  imports: [
    forwardRef(() => EmpleadoModule),
    forwardRef(() => EmprendedorModule),
  ],
})
export class EmpresaModule {
  constructor(private readonly empresaSeeder: EmpresaSeeder) {}

  async onModuleInit() {
    await this.empresaSeeder.seedEmpresas(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
