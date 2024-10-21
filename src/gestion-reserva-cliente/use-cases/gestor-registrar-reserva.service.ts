import { Injectable } from '@nestjs/common';
import { registrarReservaDeTurnoDTO } from '../interfaces/registrarReservaTurno.dto';// Asegúrate de que la ruta sea correcta
import { ClienteService } from '../modules/cliente/cliente.service'; // Servicio para manejar clientes
import { Reserva } from '../modules/reserva/entities/reserva.entity';
import { TurnoService } from '../modules/turno/turno.service'; // Servicio para manejar turnos

@Injectable()
export class GestorRegistrarReservaService {
    constructor(
        private readonly clienteService: ClienteService,
        private readonly turnoService: TurnoService,
    ) { }

    async registrarReservaDeTurno(datos: registrarReservaDeTurnoDTO) {
        const { idCliente, idsTurnos, fecha } = datos;

        
        // Crear una nueva reserva
        const nuevaReserva = new Reserva();
        nuevaReserva.fecha = fecha;
        nuevaReserva.turnos = [];

        // Asociar los turnos reservados a la nueva reserva
        for (const idTurno of idsTurnos) {
            const turno = await this.turnoService.buscar(idTurno);
            if (turno) {
                // await this.turnoService.reservar(turno, nuevaReserva);
            } else {
                throw new Error(`Turno con ID ${idTurno} no encontrado`);
            }
        }

        return await this.clienteService.registrarReserva(nuevaReserva,idCliente);;
    }
}