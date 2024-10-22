import { Module } from '@nestjs/common';
import { GestionReservaClienteController } from './gestion-reserva-cliente.controller';
import { GestionReservaClienteService } from './gestion-reserva-cliente.service';
import { ClienteModule } from './modules/cliente/cliente.module';
import { GestorRegistrarReservaService } from './use-cases/gestor-registrar-reserva.service';
import { ReservaModule } from './modules/reserva/reserva.module';
import { TurnoModule } from './modules/turno/turno.module';
import { EstadoReservaModule } from './modules/estado-reserva/estado-reserva.module';
import { EstadoTurnoModule } from './modules/estado-turno/estado-turno.module';

@Module({
  controllers: [GestionReservaClienteController],
  providers: [GestionReservaClienteService, GestorRegistrarReservaService], 
  imports: [ClienteModule, ReservaModule, TurnoModule, EstadoReservaModule, EstadoTurnoModule], 
})
export class GestionReservaClienteModule {}
