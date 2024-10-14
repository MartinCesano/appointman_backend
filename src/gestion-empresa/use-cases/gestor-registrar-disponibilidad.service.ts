import { Injectable } from '@nestjs/common';
import { aplicarHorarioDTO } from '../interfaces/aplicar-horario.dto';
import { DateTime } from 'luxon';
import { Disponibilidad } from '../modules/disponibilidad/disponibilidad.entity';


@Injectable()
export class GestorRegistrarDisponibilidadService {

    constructor(

    ) { }

    async registrarDisponibilidadAplicandoHorarioForzado(aplicarHorarioDTO: aplicarHorarioDTO) {

        const fechaInicio = aplicarHorarioDTO.fechaInicio;
        const fechaFin = aplicarHorarioDTO.fechaFin;
        const lunes = aplicarHorarioDTO.lunes;
        const martes = aplicarHorarioDTO.martes;
        const miercoles = aplicarHorarioDTO.miercoles;
        const jueves = aplicarHorarioDTO.jueves;
        const viernes = aplicarHorarioDTO.viernes;
        const sabado = aplicarHorarioDTO.sabado;
        const domingo = aplicarHorarioDTO.domingo;

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

        
        // Generar las fechas correspondientes solo para los días activos
        let currentDate = startDate.startOf('week');
        while (currentDate <= endDate) {
            diasActivos.forEach(({ diaNumero }) => {
                const nextDate = currentDate.plus({ days: (diaNumero - currentDate.weekday + 7) % 7 });
                if (nextDate <= endDate && nextDate >= startDate) {
                    // Buscar o crear el objeto de disponibilidad para el empleado en la fecha indicada
                    let disponibilidad = await this.buscarDisponibilidad(empleadoId, nextDate.toISODate());
                    if (!disponibilidad) {
                        disponibilidad = new Disponibilidad();
                        disponibilidad.empleadoId = empleadoId;
                        disponibilidad.fecha = nextDate.toISODate();
                        // Asigna otros atributos necesarios a disponibilidad
                        await this.guardarDisponibilidad(disponibilidad);
                    }
                }
            });
            currentDate = currentDate.plus({ weeks: 1 });
        }

        return "Peticion Recibida"
    }

}
