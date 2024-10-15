import { Module } from '@nestjs/common';
import { GestionEmpresaService } from './gestion-empresa.service';
import { GestorRegistrarTipoServicioService } from './use-cases/gestor-registrar-tipo-servicio.service';
import { GestionEmpresaController } from './gestion-empresa.controller';
import { ServicioModule } from 'src/gestion-empresa/modules/servicio/servicio.module';
import { GestorRegistrarDisponibilidadService } from './use-cases/gestor-registrar-disponibilidad.service';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { TurnoModule } from 'src/gestion-reserva-cliente/modules/turno/turno.module';
import { HorarioModule } from './modules/horario/horario.module';
import { HoraModule } from 'src/gestion-reserva-cliente/modules/hora/hora.module';
import { DisponibilidadModule } from './modules/disponibilidad/disponibilidad.module';
import { PrestadorServicioModule } from './modules/prestador-servicio/prestador-servicio.module';

@Module({
  controllers: [GestionEmpresaController],
  providers: [
    GestionEmpresaService,
    GestorRegistrarTipoServicioService,
    GestorRegistrarDisponibilidadService, 
  ],
  imports: [
    ServicioModule, 
    EmpleadoModule,
    TurnoModule,
    HorarioModule,
    HoraModule,
    DisponibilidadModule, 
    TurnoModule,
    PrestadorServicioModule,
  ]
})
export class GestionEmpresaModule {}
