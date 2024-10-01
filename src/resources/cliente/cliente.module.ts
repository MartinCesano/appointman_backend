import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClienteEntity} from "./entities/cliente.entity";

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
  imports: [TypeOrmModule.forFeature([ClienteEntity])]
})
export class ClienteModule {}
