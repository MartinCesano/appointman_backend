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
        const { startDate, endDate, diasActivos, horas } = await this.prepararDatos(aplicarHorarioDTO);

        let currentDate = startDate.startOf('week');
        while (currentDate <= endDate) {
            for (const { diaNumero } of diasActivos) {
                const nextDate = this.calcularSiguienteFecha(currentDate, diaNumero);
                if (nextDate <= endDate && nextDate >= startDate) {
                    await this.procesarDisponibilidad(empleadoId, nextDate, horas, aplicarHorarioDTO.horarioId);
                }
            }
            currentDate = currentDate.plus({ weeks: 1 });
        }

        return "Peticion Recibida";
    }

    // Submétodo para preparar los datos principales
    private async prepararDatos(aplicarHorarioDTO: aplicarHorarioDTO) {
        const startDate = DateTime.fromISO(aplicarHorarioDTO.fechaInicio).startOf('day');
        const endDate = DateTime.fromISO(aplicarHorarioDTO.fechaFin).startOf('day');
        const diasActivos = this.obtenerDiasActivos(aplicarHorarioDTO);

        // Obtener las horas definidas en el horario
        const horario = await this.horarioService.buscar(aplicarHorarioDTO.horarioId);
        const horas = horario.horas;

        return { startDate, endDate, diasActivos, horas };
    }

    // Submétodo para obtener los días activos
    private obtenerDiasActivos(aplicarHorarioDTO: aplicarHorarioDTO) {
        const diasSemana = {
            1: { nombre: 'lunes', activo: aplicarHorarioDTO.lunes },
            2: { nombre: 'martes', activo: aplicarHorarioDTO.martes },
            3: { nombre: 'miércoles', activo: aplicarHorarioDTO.miercoles },
            4: { nombre: 'jueves', activo: aplicarHorarioDTO.jueves },
            5: { nombre: 'viernes', activo: aplicarHorarioDTO.viernes },
            6: { nombre: 'sábado', activo: aplicarHorarioDTO.sabado },
            7: { nombre: 'domingo', activo: aplicarHorarioDTO.domingo }
        };

        return Object.entries(diasSemana)
            .filter(([_, diaInfo]) => diaInfo.activo)
            .map(([diaNumero, diaInfo]) => ({ diaNumero: parseInt(diaNumero), nombre: diaInfo.nombre }));
    }

    // Submétodo para calcular la siguiente fecha del día activo
    private calcularSiguienteFecha(currentDate: DateTime, diaNumero: number) {
        return currentDate.plus({ days: (diaNumero - currentDate.weekday + 7) % 7 });
    }

    // Submétodo para procesar la disponibilidad de un empleado
    private async procesarDisponibilidad(empleadoId: number, nextDate: DateTime, horas: any[], horarioId: number) {
        let disponibilidad = await this.disponibilidadService.buscarDisponibilidad(empleadoId, nextDate.toISODate());

        if (!disponibilidad) {
            disponibilidad = await this.crearNuevaDisponibilidad(empleadoId, nextDate, horarioId);
        } else {
            await this.actualizarDisponibilidadExistente(disponibilidad);
        }

        await this.crearTurnosParaDisponibilidad(disponibilidad, horas);
        await this.disponibilidadService.actualizar(disponibilidad);
        console.log(disponibilidad);
    }

    // Submétodo para crear una nueva disponibilidad
    private async crearNuevaDisponibilidad(empleadoId: number, nextDate: DateTime, horarioId: number) {
        const disponibilidad = new Disponibilidad();
        disponibilidad.empleado = await this.empleadoService.buscar(empleadoId);
        disponibilidad.fecha = nextDate.toISODate();

        const horario = await this.horarioService.buscar(horarioId);
        disponibilidad.horaInicio = horario.horaInicio;
        disponibilidad.horaFin = horario.horaFin;
        disponibilidad.turnos = [];
        
        await this.disponibilidadService.registrar(disponibilidad);
        return disponibilidad;
    }

    // Submétodo para actualizar la disponibilidad existente
    private async actualizarDisponibilidadExistente(disponibilidad: Disponibilidad) {
        await this.turnoService.borrar(disponibilidad.id);
        disponibilidad.turnos = [];
    }

    // Submétodo para crear turnos para la disponibilidad
    private async crearTurnosParaDisponibilidad(disponibilidad: Disponibilidad, horas: any[]) {
        for (const hora of horas) {
            const turno = new Turno();
            turno.hora = hora;
            await this.turnoService.registrar(turno);
            disponibilidad.turnos.push(turno);
        }
    }
}