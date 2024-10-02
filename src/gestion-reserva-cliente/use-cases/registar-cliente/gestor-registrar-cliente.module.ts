import { Module } from '@nestjs/common';
import { GestorRegistrarClienteController } from './gestor-registrar-cliente.controller';
import { GestorRegistrarClienteService } from './gestor-registrar-cliente.service';
import { ClienteService } from 'src/resources/cliente/cliente.service';
import { ClienteModule } from 'src/resources/cliente/cliente.module';


@Module({
  controllers: [GestorRegistrarClienteController],
  providers: [GestorRegistrarClienteService],
  imports: [ClienteModule],
})
export class GestorRegistrarClienteModule {}
