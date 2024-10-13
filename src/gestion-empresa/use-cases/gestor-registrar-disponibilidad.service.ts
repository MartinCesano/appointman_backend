import { Injectable } from '@nestjs/common';
import { aplicarHorarioDTO } from '../interfaces/aplicar-horario.dto';
import { DateTime } from 'luxon';


@Injectable()
export class GestorRegistrarDisponibilidadService {

    constructor(

    ) {}
    
    async registrarDisponibilidadAplicandoHorarioForzado(aplicarHorarioDTO: aplicarHorarioDTO) {
        
        const fechaInicio = aplicarHorarioDTO.fechaInicio;
        const fechaFin  = aplicarHorarioDTO.fechaFin;
        const lunes = aplicarHorarioDTO.lunes;
        const martes = aplicarHorarioDTO.martes;
        const miercoles = aplicarHorarioDTO.miercoles;
        const jueves = aplicarHorarioDTO.jueves;
        const viernes = aplicarHorarioDTO.viernes;
        const sabado = aplicarHorarioDTO.sabado;
        const domingo = aplicarHorarioDTO.domingo;

        const startDate = DateTime.fromISO(fechaInicio).startOf('day');
        const endDate = DateTime.fromISO(fechaFin).startOf('day');

        let currentDate = startDate;

        const diasSemana = {
            1: { nombre: 'lunes', activo: lunes },
            2: { nombre: 'martes', activo: martes },
            3: { nombre: 'miércoles', activo: miercoles },
            4: { nombre: 'jueves', activo: jueves },
            5: { nombre: 'viernes', activo: viernes },
            6: { nombre: 'sábado', activo: sabado },
            7: { nombre: 'domingo', activo: domingo }
        };

        while (currentDate <= endDate) {
            const diaSemana = currentDate.weekday;
            const diaInfo = diasSemana[diaSemana];

            if (diaInfo.activo) {
                console.log(`${diaInfo.nombre}: ${currentDate.toISODate()}`);
            }

            currentDate = currentDate.plus({ days: 1 });
        }

        return "Peticion Recibida"
    }

}
