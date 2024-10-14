import { Injectable } from '@nestjs/common';
import { aplicarHorarioDTO } from '../interfaces/aplicar-horario.dto';
import { DateTime } from 'luxon';
import { DisponibilidadService } from '../modules/disponibilidad/disponibilidad.service';
import { TurnoService } from 'src/gestion-reserva-cliente/modules/turno/turno.service';
import { HoraService } from 'src/gestion-reserva-cliente/modules/hora/hora.service';
import { Disponibilidad } from '../modules/disponibilidad/disponibilidad.entity';
import { Turno } from 'src/gestion-reserva-cliente/modules/turno/turno.entity';
import { EmpleadoService } from '../modules/empleado/empleado.service';
import { HorarioService } from '../modules/horario/horario.service';

@Injectable()
export class GestorRegistrarDisponibilidadService {
    constructor(
        private readonly disponibilidadService: DisponibilidadService,
        private readonly turnoService: TurnoService,
        private readonly horaService: HoraService,
        private readonly empleadoService: EmpleadoService,
        private readonly horarioService: HorarioService,
    ) { }

    async registrarDisponibilidadAplicandoHorarioForzado(aplicarHorarioDTO: aplicarHorarioDTO) {
        const empleadoId = aplicarHorarioDTO.empleadoId;
        const fechaInicio = aplicarHorarioDTO.fechaInicio;
        const fechaFin = aplicarHorarioDTO.fechaFin;
        const lunes = aplicarHorarioDTO.lunes;
        const martes = aplicarHorarioDTO.martes;
        const miercoles = aplicarHorarioDTO.miercoles;
        const jueves = aplicarHorarioDTO.jueves;
        const viernes = aplicarHorarioDTO.viernes;
        const sabado = aplicarHorarioDTO.sabado;
        const domingo = aplicarHorarioDTO.domingo;
        const horarioId = aplicarHorarioDTO.horarioId;

        const startDate = DateTime.fromISO(fechaInicio).startOf('day');
        const endDate = DateTime.fromISO(fechaFin).startOf('day');

        const diasSemana = {
            1: { nombre: 'lunes', activo: lunes },
            2: { nombre: 'martes', activo: martes },
            3: { nombre: 'miércoles', activo: miercoles },
            4: { nombre: 'jueves', activo: jueves },
            5: { nombre: 'viernes', activo: viernes },
            6: { nombre: 'sábado', activo: sabado },
            7: { nombre: 'domingo', activo: domingo }
        };

        // Filtrar los días activos
        const diasActivos = Object.entries(diasSemana)
            .filter(([_, diaInfo]) => diaInfo.activo)
            .map(([diaNumero, diaInfo]) => ({ diaNumero: parseInt(diaNumero), nombre: diaInfo.nombre }));

        // Obtener las horas definidas en el horario
        const horario = await this.horarioService.buscar(horarioId);
        const horas = horario.horas;

        let currentDate = startDate.startOf('week');
        while (currentDate <= endDate) {
            for (const { diaNumero } of diasActivos) {
                const nextDate = currentDate.plus({ days: (diaNumero - currentDate.weekday + 7) % 7 });
                if (nextDate <= endDate && nextDate >= startDate) {
                    // Buscar o crear el objeto de disponibilidad para el empleado en la fecha indicada
                    let disponibilidad = await this.disponibilidadService.buscarDisponibilidad(empleadoId, nextDate.toISODate());
                    if (!disponibilidad) {
                        disponibilidad = new Disponibilidad();
                        disponibilidad.empleado = await this.empleadoService.buscar(empleadoId);
                        disponibilidad.fecha = nextDate.toISODate();
                        disponibilidad.turnos = []; // Inicializar el array de turnos
                    } else {
                        // Si la disponibilidad ya existe, borrar todos los turnos asociados
                        await this.turnoService.borrar(disponibilidad.id);
                        disponibilidad.turnos = []; // Reinicializar el array de turnos
                    }

                    // Crear turnos para la disponibilidad usando las horas definidas
                    for (const hora of horas) {
                        const turno = new Turno();
                        turno.disponibilidad = disponibilidad;
                        disponibilidad.turnos.push(turno); // Agregar el turno a la disponibilidad
                    }

                    // Registrar la disponibilidad al final
                    if (!disponibilidad.id) {
                        await this.disponibilidadService.registrar(disponibilidad);
                    } else {
                        // Actualizar la disponibilidad si ya existe
                        await this.disponibilidadService.actualizar(disponibilidad);
                    }
                }
            }
            currentDate = currentDate.plus({ weeks: 1 });
        }

        return "Peticion Recibida";
    }
}