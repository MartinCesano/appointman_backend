import { Module } from '@nestjs/common';
import { GestionEmpresaService } from './gestion-empresa.service';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { GestionEmpresaController } from './gestion-empresa.controller';
import { ServicioModule } from 'src/gestion-empresa/modules/servicio/servicio.module';
import { GestorRegistrarDisponibilidadService } from './use-cases/gestor-registrar-disponibilidad.service';

@Module({
  controllers: [GestionEmpresaController],
  providers: [
    GestionEmpresaService,
    GestorRegistrarTipoServicioService,
    GestorRegistrarDisponibilidadService],
  imports: [ServicioModule]
})
export class GestionEmpresaModule {}
