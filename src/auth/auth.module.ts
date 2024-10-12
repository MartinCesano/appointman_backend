import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { JwtModule } from './modules/jwt/jwt.module';
import {AuthController} from './auth.controller';
import { GestorRegistrarUsuarioService } from './use-cases/gestor-registrar-usuario.service';
import { ClienteModule } from 'src/gestion-reserva-cliente/modules/cliente/cliente.module';
import { EmpleadoModule } from 'src/gestion-empresa/modules/empleado/empleado.module';
import { EmprendedorModule } from 'src/gestion-empresa/modules/emprendedor/emprendedor.module';
import { RolModule } from './modules/rol/rol.module';

@Module({
  providers: [AuthService, AuthGuard, GestorRegistrarUsuarioService],
  imports: [JwtModule, UsuarioModule, ClienteModule, EmpleadoModule, EmprendedorModule, RolModule  ],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
