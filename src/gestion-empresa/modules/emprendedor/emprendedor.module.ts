import { Module } from '@nestjs/common';
import { EmprendedorService } from './emprendedor.service';
import { EmprendedorController } from './emprendedor.controller';
import {EmpresaModule} from "../empresa/empresa.module";

@Module({
  controllers: [EmprendedorController],
  providers: [EmprendedorService],
  exports: [EmprendedorService],
  imports: [EmpresaModule]
})
export class EmprendedorModule {}
