import {Injectable} from '@nestjs/common';
import {aplicarHorarioDTO} from '../interfaces/aplicar-horario.dto';
import {DateTime} from 'luxon';
import {DisponibilidadService} from '../modules/disponibilidad/disponibilidad.service';
import {TurnoService} from '../../gestion-reserva-cliente/modules/turno/turno.service';
import {Disponibilidad} from '../modules/disponibilidad/disponibilidad.entity';
import {Turno} from '../../gestion-reserva-cliente/modules/turno/turno.entity';
import {HorarioService} from '../modules/horario/horario.service';
import {IHora} from '../../gestion-reserva-cliente/interfaces/hora.interface';
import {PrestadorServicioService} from '../modules/prestador-servicio/prestador-servicio.service';
import {IHorario} from '../../gestion-reserva-cliente/interfaces/horario.interface';
import {RegistrarHorarioDTO} from "../interfaces/registrar-horario.dto";
import {HoraService} from "../../gestion-reserva-cliente/modules/hora/hora.service";
import {ITurno} from "../../gestion-reserva-cliente/interfaces/turno.interface";
import {EmpresaService} from "../modules/empresa/empresa.service";
import {IUsuario} from "../../auth/interfaces/usuario.interface";
import {UsuarioService} from "../../auth/modules/usuario/usuario.service";

@Injectable()
export class GestorABMHorariosService {
    constructor(
        private horaService: HoraService,
        private horarioService: HorarioService,
        private empresaService: EmpresaService,
        private usuarioService: UsuarioService
    ) {
    }


    /**
     * @description Metodo para obtener los horarios de una empresa
     * @param usuario
     */
    async getHorarios(usuario: IUsuario): Promise<IHorario[]> {
        const empresa = await this.usuarioService.getEmpresa(usuario);
        return this.empresaService.getHorarios(empresa.id);
    }

    /**
     * @description Registrar un horario
     * @param horario
     */
    async registrarHorario(horario: RegistrarHorarioDTO, usuario: IUsuario) {

        //creo las horas
        const multiploHoras = await this.horaService.getMultiplosHoras();

        let arrayHoras = await this.crearArrayHoras(multiploHoras, horario.horaInicio, horario.horaFin)
        const horasExistentes = await this.horaService.getAll();

        const horasFiltradas = this.filtrarHorasExistentes(horasExistentes, arrayHoras);

        const horasCreadas = await this.horaService.bulkInsert(horasFiltradas.horasACrear);
        // asigno cada elemento de arrayHoras a su id correspondiente que esta en el array horasCreadas
        arrayHoras = horasCreadas.map((hora, index) => ({...hora, ...arrayHoras[index]}));

        //junto el array de las horas que se acaban de crear con las horas que ya existian
        arrayHoras = [...horasFiltradas.horasCreadas, ...arrayHoras];

        // creo el horario
        // CONVERTIR a un array en string
        const diasActivos = horario.diasActivos.join(',');

        const nuevoHorario = await this.horarioService.insert({...horario, diasActivos, horas: arrayHoras});

        // obtengo la empresa
        const empresa = await this.usuarioService.getEmpresa(usuario);

        // asigno el horario a la sucursal
        this.empresaService.agregarHorario(empresa.id, nuevoHorario);

        return nuevoHorario;
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
            const horaFinElemento = horaInicio.plus({minutes: multiploHora});
            const hora = {
                horaInicio: horaInicio.toFormat('HH:mm'),
                horaFin: horaFinElemento.toFormat('HH:mm'),
            };
            horas.push(hora);
            horaInicio = horaFinElemento;
        }
        return horas;
    }

    /**
     * @description Metodo para filtrar las horas que ya estan creadas y retornar dos arrays: uno con las horas a crear y otro con las horas que fueron creadas.
     * @param Ihoras[] horasExistentes
     * @param Ihoras[] horasACrear
     * @returns {Object} Retorna un objeto con dos arrays: horasACrear y horasCreadas
     *
     */
    filtrarHorasExistentes(horasExistentes: IHora[], horasACrear: IHora[]): {
        horasACrear: IHora[],
        horasCreadas: IHora[]
    } {
        const horasNoCreadas = horasACrear.filter(hora => !horasExistentes.some(h => h.horaInicio === hora.horaInicio && h.horaFin === hora.horaFin));
        const horasYaCreadas = horasACrear.filter(hora => horasExistentes.some(h => h.horaInicio === hora.horaInicio && h.horaFin === hora.horaFin));
        return {horasACrear: horasNoCreadas, horasCreadas: horasYaCreadas};
    }


}
