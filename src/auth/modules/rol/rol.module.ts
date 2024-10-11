import { Module, OnModuleInit } from '@nestjs/common';
import RolController from './rol.controller';
import { RolService } from './rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { PermisoModule } from '../permiso/permiso.module';
import { RolSeeder } from './rol.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), PermisoModule],
  controllers: [RolController],
  providers: [RolService, RolSeeder],
  exports: [RolService]
})
export class RolModule implements OnModuleInit {
  constructor(private readonly roleSeeder: RolSeeder) {}

  async onModuleInit() {
    await this.roleSeeder.seedRoles(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
