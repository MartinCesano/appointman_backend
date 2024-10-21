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
import {RegistrarHorarioDTO} from "../interfaces/registrar-horario.dto";
import {HoraService} from "../../gestion-reserva-cliente/modules/hora/hora.service";
import {ITurno} from "../../gestion-reserva-cliente/interfaces/turno.interface";

@Injectable()
export class GestorABMHorariosService {
    constructor(
    private horaService: HoraService,
    private horarioService: HorarioService,
    ) { }


    /**
     * @description Registrar un horario
     * @param horario
     */
    async registrarHorario(horario: RegistrarHorarioDTO){



        // creo el horario
        // CONVERTIR a un array en string
        const diasActivos = horario.diasActivos.join(',');
        const nuevoHorario = await this.horarioService.create({ ...horario, diasActivos });

        //creo las horas
        const multiploHoras = await this.horaService.getMultiplosHoras();

        const arrayHoras = await this.crearArrayHoras(multiploHoras, horario.horaInicio, horario.horaFin)
        const horasCreadas = await this.horaService.bulkInsert(arrayHoras);

    }

    /**
     * @description Metodo que crea un array de horas segun el horario y el intervalo de tiempo(multiploHora)
     *
     * @returns {Promise<number>} Retorna un array con los datos de las horas que se deberan crear.
     */
    async crearArrayHoras(multiploHora: number, HoraInicio: string, HoraFin: string): Promise<IHora[]> {
        let horas = [];
        let horaInicio = DateTime.fromFormat(HoraInicio, 'HH:mm');
        let horaFin = DateTime.fromFormat(HoraFin, 'HH:mm');

        while (horaInicio < horaFin) {
            const horaFinElemento = horaInicio.plus({ minutes: multiploHora });
            const hora = {
                horaInicio: horaInicio.toFormat('HH:mm'),
                horaFin: horaFinElemento.toFormat('HH:mm'),
            };
            horas.push(hora);
            horaInicio = horaFinElemento;
        }

        return horas;

    }




}
