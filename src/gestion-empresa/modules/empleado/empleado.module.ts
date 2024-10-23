import { forwardRef, Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoSeeder } from './empleado.seed';
import { UsuarioModule } from '../../../auth/modules/usuario/usuario.module';

@Module({
  controllers: [EmpleadoController],
  providers: [EmpleadoService,EmpleadoSeeder],
  exports: [EmpleadoService], 
  imports: [forwardRef(() => UsuarioModule)],
})
export class EmpleadoModule {
  constructor(private readonly empleadoSeeder: EmpleadoSeeder) {}

  async onModuleInit() {
    await this.empleadoSeeder.seedEmpleados(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
