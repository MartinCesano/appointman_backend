import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { JwtModule } from '../jwt/jwt.module';
import { PermisoModule } from '../permiso/permiso.module';
import { RolModule } from '../rol/rol.module';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  imports: [JwtModule, PermisoModule, RolModule],
  exports: [UsuarioService],
})
export class UsuarioModule {}
