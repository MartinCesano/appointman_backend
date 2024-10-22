import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';

<<<<<<< HEAD
import {UsuarioService} from "../../../auth/modules/usuario/usuario.service";
import { Cliente } from './cliente.entity';
=======
>>>>>>> develop

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
<<<<<<< HEAD
  imports: [
    TypeOrmModule.forFeature([Cliente]), // Aquí se importa el repositorio del Cliente
  ],
=======
>>>>>>> develop
})
export class ClienteModule {}
