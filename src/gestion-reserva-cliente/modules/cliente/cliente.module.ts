import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteSeeder } from './cliente.seed';


@Module({
  controllers: [ClienteController],
  providers: [ClienteService, ClienteSeeder],
  exports: [ClienteService],
})
export class ClienteModule {
  constructor(private readonly clienteSeeder: ClienteSeeder) {}
  async onModuleInit() {
    await this.clienteSeeder.seedClientes(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
