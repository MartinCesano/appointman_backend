import { Module } from '@nestjs/common';
import { HoraService } from './hora.service';
import { HoraController } from './hora.controller';

@Module({
  controllers: [HoraController],
  providers: [HoraService],
  exports: [HoraService]
})
export class HoraModule {}
