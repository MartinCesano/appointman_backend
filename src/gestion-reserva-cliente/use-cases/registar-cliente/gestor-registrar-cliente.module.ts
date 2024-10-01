import { Module } from '@nestjs/common';
import { GestorRegistrarClienteController } from './gestor-registrar-cliente.controller';
import { GestorRegistrarClienteService } from './gestor-registrar-cliente.service';
import { ClienteService } from 'src/resources/cliente/cliente.service';


@Module({
  controllers: [GestorRegistrarClienteController],
  providers: [GestorRegistrarClienteService, ClienteService],
  imports: [],
})
export class GestorRegistrarClienteModule {}
