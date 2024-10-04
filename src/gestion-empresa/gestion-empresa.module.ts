import { Module } from '@nestjs/common';
import { GestionEmpresaService } from './gestion-empresa.service';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { GestionEmpresaController } from './gestion-empresa.controller';
import { ServicioModule } from 'src/resources/servicio/servicio.module';

@Module({
  controllers: [GestionEmpresaController],
  providers: [GestionEmpresaService,GestorRegistrarTipoServicioService],
  imports: [ServicioModule]
})
export class GestionEmpresaModule {}
