import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { JwtModule } from '../jwt/jwt.module';
import { PermisoModule } from '../permiso/permiso.module';
import { RolModule } from '../rol/rol.module';
import {ClienteModule} from "../../../gestion-reserva-cliente/modules/cliente/cliente.module";
import {EmprendedorModule} from "../../../gestion-empresa/modules/emprendedor/emprendedor.module";
import {EmpleadoModule} from "../../../gestion-empresa/modules/empleado/empleado.module";
import { UsuarioSeeder } from './usuario.seed';

@Module({
  providers: [UsuarioService, UsuarioSeeder],
  controllers: [UsuarioController],
  imports: [JwtModule, PermisoModule, RolModule, ClienteModule, EmprendedorModule, EmpleadoModule, ],
  exports: [UsuarioService],
})
export class UsuarioModule {
  constructor(private readonly usuarioSeeder: UsuarioSeeder) {}

  async onModuleInit() {
    await this.usuarioSeeder.seedUsuarios(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
