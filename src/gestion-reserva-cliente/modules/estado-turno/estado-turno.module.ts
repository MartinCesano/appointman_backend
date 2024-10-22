import { Module } from '@nestjs/common';
import { EstadoTurnoService } from './estado-turno.service';
import { EstadoTurnoController } from './estado-turno.controller';
import { EstadoTurnoSeeder } from './estado-turno.seed';

@Module({
  controllers: [EstadoTurnoController],
  providers: [EstadoTurnoService, EstadoTurnoSeeder],
  exports: [EstadoTurnoService]
})
export class EstadoTurnoModule {
  constructor(private readonly estadoTrunoSeeder: EstadoTurnoSeeder) {}
  async onModuleInit() {
    await this.estadoTrunoSeeder.seedEstadosTurno()// Ejecutamos el seeder cuando el módulo se inicialice
  }
}
