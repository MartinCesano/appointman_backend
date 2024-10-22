import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { EstadoReservaService } from './estado-reserva.service';
import { EstadoReserva } from './estado-reserva.entity';

@Injectable()
export class EstadoReservaSeeder {
  constructor(private readonly estadoReservaService: EstadoReservaService) {}

  async seedEstadosReserva() {
    const estados: DeepPartial<EstadoReserva>[] = [
      { nombre: 'registrado', descripcion: 'Se creo la reserva y se encuentra registrada', reservas: [] },
      { nombre: 'cancelado', descripcion: 'Fue cancelada por algun motivo por algun usuario', reservas: [] },
      { nombre: 'ausente', descripcion: 'Se paso la fecha y hora de una reserva registrada y el cliente no acudio', reservas: [] },
      { nombre: 'reagendado', descripcion: 'Se reagendo la fecha de esta reserva', reservas: [] },
    ];

    for (const estado of estados) {
      const existingRole = await this.estadoReservaService.buscarEstadoReservaPorNombre(estado.nombre);
      if (!existingRole) {
        await this.estadoReservaService.registrar(estado);
      }
    }
  }
}