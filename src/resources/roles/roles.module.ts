import { Module } from '@nestjs/common';
import RolesController from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/resources/roles/entities/role.entity';
import { PermissionsModule } from 'src/resources/permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), PermissionsModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
