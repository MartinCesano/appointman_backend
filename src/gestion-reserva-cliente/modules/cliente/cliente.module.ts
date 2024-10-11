import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {TypeOrmModule} from "@nestjs/typeorm";

import {UsuarioService} from "../../../auth/modules/usuario/usuario.service";

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
  imports: []
})
export class ClienteModule {}
