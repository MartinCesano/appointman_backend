import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

import {UsuarioService} from "../../../auth/modules/usuario/usuario.service";
import { Cliente } from './entities/cliente.entity';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
  imports: [
    TypeOrmModule.forFeature([Cliente]), // Aquí se importa el repositorio del Cliente
  ],
})
export class ClienteModule {}
