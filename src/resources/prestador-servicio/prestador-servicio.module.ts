import { Module } from '@nestjs/common';
import { PrestadorServicioService } from './prestador-servicio.service';
import { PrestadorServicioController } from './prestador-servicio.controller';

@Module({
  controllers: [PrestadorServicioController],
  providers: [PrestadorServicioService],
})
export class PrestadorServicioModule {}
