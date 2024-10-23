import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteSeeder } from './cliente.seed';


@Module({
  controllers: [ClienteController],
  providers: [ClienteService, ClienteSeeder],
  exports: [ClienteService],
  imports: [
    TypeOrmModule.forFeature([Cliente]), // Aquí se importa el repositorio del Cliente
  ],
})
export class ClienteModule {
  constructor(private readonly clienteSeeder: ClienteSeeder) {}
  async onModuleInit() {
    await this.clienteSeeder.seedClientes(); // Ejecutamos el seeder cuando el módulo se inicialice
  }
}
