import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Module({
  controllers: [],
  providers: [EmpresaService],
})
export class EmpresaModule {}
