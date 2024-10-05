import { Module } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { Permiso } from './permiso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Permiso])],
  providers: [PermisoService],
  controllers: [PermisoController],
  exports: [PermisoService]
})
export class PermisoModule {}
