import { Module } from '@nestjs/common';
import { HoraService } from './hora.service';
import { HoraController } from './hora.controller';

@Module({
  controllers: [HoraController],
  providers: [HoraService],
})
export class HoraModule {}
