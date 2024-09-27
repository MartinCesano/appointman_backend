import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permiso } from 'src/resources/permissions/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Permiso])],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [PermissionsService]
})
export class PermissionsModule {}
