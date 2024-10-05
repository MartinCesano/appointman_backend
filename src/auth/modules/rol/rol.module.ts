import { Module } from '@nestjs/common';
import RolController from './rol.controller';
import { RolService } from './rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { PermisoModule } from '../permiso/permiso.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), PermisoModule],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService]
})
export class RolModule {}
