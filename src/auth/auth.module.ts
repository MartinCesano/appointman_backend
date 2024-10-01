import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { JwtModule } from './modules/jwt/jwt.module';

@Module({
  providers: [AuthService, AuthGuard],
  imports: [JwtModule, UsuarioModule],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
