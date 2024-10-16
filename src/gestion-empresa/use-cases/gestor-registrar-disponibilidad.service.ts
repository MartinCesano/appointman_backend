import { Injectable } from '@nestjs/common';
import { aplicarHorarioDTO } from '../interfaces/aplicar-horario.dto';
import { DateTime } from 'luxon';
import { DisponibilidadService } from '../modules/disponibilidad/disponibilidad.service';
import { TurnoService } from '../../gestion-reserva-cliente/modules/turno/turno.service';
import { Disponibilidad } from '../modules/disponibilidad/disponibilidad.entity';
import { Turno } from '../../gestion-reserva-cliente/modules/turno/turno.entity';
import { HorarioService } from '../modules/horario/horario.service';
import { IHora } from '../../gestion-reserva-cliente/interfaces/hora.interface';
import { PrestadorServicioService } from '../modules/prestador-servicio/prestador-servicio.service';
import { IHorario } from '../../gestion-reserva-cliente/interfaces/horario.interface';

@Injectable()
export class GestorRegistrarDisponibilidadService {
    constructor(
        private readonly disponibilidadService: DisponibilidadService,
        private readonly turnoService: TurnoService,
        private readonly prestadorServicioService: PrestadorServicioService,
        private readonly horarioService: HorarioService,
    ) { }

    async registrarDisponibilidadAplicandoHorarioForzado(aplicarHorarioDTO: aplicarHorarioDTO) {
        try {
            const prestadorId = aplicarHorarioDTO.prestadorId;
            const startDate = DateTime.fromISO(aplicarHorarioDTO.fechaInicio).startOf('day');
            const endDate = DateTime.fromISO(aplicarHorarioDTO.fechaFin).startOf('day');

            // Obtener horas del horario
            const horario = await this.obtenerHorario(aplicarHorarioDTO.horarioId);
            const horas = horario.horas;
            const diasActivos = this.filtrarDiasActivos(horario);
            console.log('Días activos:', diasActivos);


            // Generar disponibilidades y turnos
            const { disponibilidades, turnosCreados } = await this.generarDisponibilidadesYTurnos(
                prestadorId, 
                startDate, 
                endDate, 
                diasActivos, 
                horas, 
                horario
            );

            // Retornar un resumen con los resultados
            return {
                message: 'Horario aplicado exitosamente',
                disponibilidadesCreadas: disponibilidades.length,
                turnosCreados: turnosCreados.length,
                disponibilidades,
                turnos: turnosCreados,
            };
        } catch (error) {
            console.error('Error al registrar la disponibilidad aplicando horario forzado:', error);
            throw new Error('Error en el proceso de registro de disponibilidad');
        }
    }

    private filtrarDiasActivos(horario: IHorario) {
        try {
            const diasActivos = horario.diasActivos
            const diasSemana = {
                1: { nombre: 'lunes', activo: diasActivos.includes('lunes') },
                2: { nombre: 'martes', activo: diasActivos.includes('martes') },
                3: { nombre: 'miércoles', activo: diasActivos.includes('miercoles') },
                4: { nombre: 'jueves', activo: diasActivos.includes('jueves') },
                5: { nombre: 'viernes', activo: diasActivos.includes('viernes') },
                6: { nombre: 'sabado', activo: diasActivos.includes('sabado') },
                7: { nombre: 'domingo', activo: diasActivos.includes('domingo') },

            };

            return Object.entries(diasSemana)
                .filter(([_, diaInfo]) => diaInfo.activo)
                .map(([diaNumero, diaInfo]) => ({ diaNumero: parseInt(diaNumero), nombre: diaInfo.nombre }));
        } catch (error) {
            console.error('Error al filtrar días activos:', error);
            throw new Error('Error al procesar los días activos');
        }
    }

    private async obtenerHorario(horarioId: number) {
        try {
            const horario = await this.horarioService.buscar(horarioId);
            if (!horario) {
                throw new Error(`Horario con ID ${horarioId} no encontrado`);
            }
            return horario;
        } catch (error) {
            console.error('Error al obtener el horario:', error);
            throw new Error('Error al buscar el horario');
        }
    }

    private async generarDisponibilidadesYTurnos(
        prestadorId: number,
        startDate: DateTime,
        endDate: DateTime,
        diasActivos: any[],
        horas: any[],
        horario: any
    ) {
        const disponibilidades: Disponibilidad[] = [];
        const turnosCreados: Turno[] = [];

        let currentDate = startDate.startOf('week');
        while (currentDate <= endDate) {
            for (const { diaNumero } of diasActivos) {
                try {
                    const nextDate = currentDate.plus({ days: (diaNumero - currentDate.weekday + 7) % 7 });
                    if (nextDate <= endDate && nextDate >= startDate) {
                        let disponibilidad = await this.obtenerOcrearDisponibilidad(prestadorId, nextDate, horario);
                        disponibilidades.push(disponibilidad);

                        await this.turnoService.borrar(disponibilidad.id);
                        disponibilidad.turnos = [];

                        const turnos = await this.registrarTurnos(disponibilidad, horas);
                        turnosCreados.push(...turnos);

                        await this.disponibilidadService.actualizar(disponibilidad);
                    }
                } catch (error) {
                    console.error(`Error al generar disponibilidad para la fecha ${currentDate.toISODate()}:`, error);
                    throw new Error(`Error al generar disponibilidad para el día ${diaNumero}`);
                }
            }
            currentDate = currentDate.plus({ weeks: 1 });
        }

        return { disponibilidades, turnosCreados };
    }

    private async obtenerOcrearDisponibilidad(prestadorId: number, nextDate: DateTime, horario: any) {
        try {
            let disponibilidad = await this.disponibilidadService.buscarDisponibilidad(prestadorId, nextDate.toISODate());
            if (!disponibilidad) {
                disponibilidad = new Disponibilidad();
                disponibilidad.prestadorServicio = await this.prestadorServicioService.buscar(prestadorId);
                disponibilidad.fecha = nextDate.toISODate();
                disponibilidad.horaInicio = horario.horaInicio;
                disponibilidad.horaFin = horario.horaFin;
                disponibilidad.turnos = [];
                await this.disponibilidadService.registrar(disponibilidad);
            }
            return disponibilidad;
        } catch (error) {
            console.error('Error al obtener o crear disponibilidad:', error);
            throw new Error('Error al gestionar la disponibilidad');
        }
    }

    private async registrarTurnos(disponibilidad: Disponibilidad, horas: IHora[]): Promise<Turno[]> {
        const turnos: Turno[] = []; // Crear un array para almacenar los turnos creados
        try {
            for (const hora of horas) {
                const turno = new Turno();
                turno.hora = hora;
                // No es necesario asignar disponibilidad aquí, ya que no hay relación inversa
                await this.turnoService.registrar(turno);
        
                // Agregar el turno a la disponibilidad
                disponibilidad.turnos.push(turno);
                turnos.push(turno); // Agregar el turno al array de turnos
            }
        } catch (error) {
            console.error('Error al registrar turnos:', error);
            throw new Error('Error al registrar turnos');
        }
        return turnos; // Retornar el array de turnos creados
    }
}
