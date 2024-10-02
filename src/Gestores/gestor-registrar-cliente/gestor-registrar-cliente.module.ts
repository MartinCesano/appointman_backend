import { Module } from '@nestjs/common';
import { GestorRegistrarClienteController } from './gestor-registrar-cliente.controller';
import { GestorRegistrarClienteService } from './gestor-registrar-cliente.service';
import { ClienteService } from '../../resources/cliente/cliente.service';
import { ClienteModule } from '../../resources/cliente/cliente.module';


@Module({
  controllers: [GestorRegistrarClienteController],
  providers: [GestorRegistrarClienteService],
  imports: [ClienteModule],
})
export class GestorRegistrarClienteModule {}
