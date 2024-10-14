import { Module } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';

@Module({
  controllers: [TurnoController],
  providers: [TurnoService],
  imports: [ ],
  exports: [TurnoService]
  
})
export class TurnoModule {}
