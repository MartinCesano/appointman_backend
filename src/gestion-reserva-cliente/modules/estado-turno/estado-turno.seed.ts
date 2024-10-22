import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { EstadoTurnoService } from './estado-turno.service';
import { EstadoTurno } from './estado-turno.entity';

@Injectable()
export class EstadoTurnoSeeder {
  constructor(private readonly estadoTurnoService: EstadoTurnoService) {}

  async seedEstadosTurno() {
    const estados: DeepPartial<EstadoTurno>[] = [
      { nombre: 'disponible', descripcion: 'Se muestra disponible para ser reservado', turnos: [] },
      { nombre: 'reservado', descripcion: 'Se encuentra reservado, no se muestra disponible', turnos: [] },
      { nombre: 'concretado', descripcion: 'Se paso la fecha y hora del turno, estaba reservado y el cliente acudio', turnos: [] },
      { nombre: 'cancelado', descripcion: 'Se paso la fecha y hora del turno, estaba reservado y el cliente no acudio', turnos: [] },
      { nombre: 'expirado', descripcion: 'Se paso la fecha y hora del turno y nadie lo reservo', turnos: [] },
    ];

    for (const estado of estados) {
      const existingRole = await this.estadoTurnoService.buscarPorNombre(estado.nombre);
      if (!existingRole) {
        await this.estadoTurnoService.registrar(estado);
      }
    }
  }
}