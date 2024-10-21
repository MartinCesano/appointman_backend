import { Injectable } from '@nestjs/common';
import { registrarReservaDeTurnoDTO } from '../interfaces/registrarReservaTurno.dto';// Asegúrate de que la ruta sea correcta
import { ClienteService } from '../modules/cliente/cliente.service'; // Servicio para manejar clientes
import { TurnoService } from '../modules/turno/turno.service'; // Servicio para manejar turnos
import { Reserva } from '../modules/reserva/reserva.entity';
import { ReservaService } from '../modules/reserva/reserva.service';

@Injectable()
export class GestorRegistrarReservaService {
    constructor(
        private readonly clienteService: ClienteService,
        private readonly turnoService: TurnoService,
        private readonly reservaService: ReservaService
    ) { }

    async registrarReservaDeTurno(datos: registrarReservaDeTurnoDTO) {
        const cliente = await this.clienteService.buscar(datos.idCliente);
        if (!cliente) {
            throw new Error(`Cliente con ID ${datos.idCliente} no encontrado`);
        }
        const nuevaReserva = new Reserva();

        nuevaReserva.fecha = datos.fecha;
        nuevaReserva.hora = datos.hora;
        nuevaReserva.cliente = cliente;
        nuevaReserva.turnos = [];
        for (const idTurno of datos.idsTurnos) {
            const turno = await this.turnoService.buscar(idTurno);
            if (!turno) {
                throw new Error(`Turno con ID ${idTurno} no encontrado`);
            }
            nuevaReserva.turnos.push(turno);
        }

        return await this.reservaService.registrar(nuevaReserva)
    }
}