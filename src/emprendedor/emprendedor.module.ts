import { Module } from '@nestjs/common';
import { EmprendedorService } from './emprendedor.service';
import { EmprendedorController } from './emprendedor.controller';

@Module({
  controllers: [EmprendedorController],
  providers: [EmprendedorService],
})
export class EmprendedorModule {}
