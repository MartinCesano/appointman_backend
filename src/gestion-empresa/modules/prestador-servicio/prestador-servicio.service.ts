import { Injectable } from '@nestjs/common';
import { PrestadorServicio } from './prestador-servicio.entity';
import { IHorario} from "../../../gestion-reserva-cliente/interfaces/horario.interface";

@Injectable()
export class PrestadorServicioService {

    repository = PrestadorServicio;


    buscar(id: number): Promise<PrestadorServicio> {
        return this.repository.findOne({ where: { id } });
      }

      async agregarHorario(id: number, horario: IHorario) {
        // const prestador = await this.buscar(id);
        // prestador.horario.push(horario);
        // return prestador.save();
      }


}
