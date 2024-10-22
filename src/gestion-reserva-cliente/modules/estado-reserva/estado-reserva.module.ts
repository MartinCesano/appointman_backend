import { Module } from '@nestjs/common';
import { EstadoReservaService } from './estado-reserva.service';
import { EstadoReservaController } from './estado-reserva.controller';
import { EstadoReservaSeeder } from './estado-reserva.seed';

@Module({
  controllers: [EstadoReservaController],
  providers: [EstadoReservaService, EstadoReservaSeeder],
})
export class EstadoReservaModule {
  constructor(private readonly estadoReservaSeeder: EstadoReservaSeeder) {}
  async onModuleInit() {
    await this.estadoReservaSeeder.seedEstadosReserva() // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
