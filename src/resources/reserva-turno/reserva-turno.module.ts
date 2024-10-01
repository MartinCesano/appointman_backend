import { Module } from '@nestjs/common';
import { ReservaTurnoService } from './reserva-turno.service';
import { ReservaTurnoController } from './reserva-turno.controller';

@Module({
  controllers: [ReservaTurnoController],
  providers: [ReservaTurnoService],
})
export class ReservaTurnoModule {}
