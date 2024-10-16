import { Module } from '@nestjs/common';
import { GestionReservaClienteController } from './gestion-reserva-cliente.controller';
import { GestionReservaClienteService } from './gestion-reserva-cliente.service';
import { ClienteModule } from './modules/cliente/cliente.module';
import { GestorRegistrarClienteService } from './use-cases/gestor-registrar-cliente.service';

@Module({
  controllers: [GestionReservaClienteController],
  providers: [GestionReservaClienteService, GestorRegistrarClienteService], 
  imports: [ClienteModule], 
})
export class GestionReservaClienteModule {}
