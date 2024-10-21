import { Hora } from '../../gestion-reserva-cliente/modules/hora/hora.entity';
import { IHora} from "../../gestion-reserva-cliente/interfaces/hora.interface";

export class CreateHorarioDto {
    nombre: string;
    horaInicio: string;
    horaFin: string;
    diasActivos: string;
    horas?: IHora[];
}
