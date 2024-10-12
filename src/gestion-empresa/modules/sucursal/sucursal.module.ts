import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';

@Module({
  controllers: [],
  providers: [SucursalService],
  exports: [SucursalService],
})
export class SucursalModule {}
