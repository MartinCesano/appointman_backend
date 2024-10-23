import { forwardRef, Module } from '@nestjs/common';
import { EmprendedorService } from './emprendedor.service';
import { EmprendedorController } from './emprendedor.controller';
import {EmpresaModule} from "../empresa/empresa.module";
import { EmprendedorSeeder } from './emprendedor.seed';
import { UsuarioModule } from '../../../auth/modules/usuario/usuario.module';

@Module({
  controllers: [EmprendedorController],
  providers: [EmprendedorService, EmprendedorSeeder],
  exports: [EmprendedorService],
  imports: [
    forwardRef(() => UsuarioModule), 
    forwardRef(() => EmpresaModule)
  ]
})
export class EmprendedorModule {
  constructor(private readonly emprendedorSeeder: EmprendedorSeeder) {}

  async onModuleInit() {
    await this.emprendedorSeeder.seedEmprendedores(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
