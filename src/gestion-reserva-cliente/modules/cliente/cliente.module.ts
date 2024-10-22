import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
  imports: [
    TypeOrmModule.forFeature([Cliente]), // Aquí se importa el repositorio del Cliente
  ],
})
export class ClienteModule {}
