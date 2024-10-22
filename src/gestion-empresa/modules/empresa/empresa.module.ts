import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Module({
  controllers: [],
  providers: [EmpresaService],
  exports: [EmpresaService]
})
export class EmpresaModule {}
