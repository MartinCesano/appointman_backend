import { Injectable } from '@nestjs/common';
import { PrestadorServicio } from './prestador-servicio.entity';

@Injectable()
export class PrestadorServicioService {

    repository = PrestadorServicio;


    buscar(id: number): Promise<PrestadorServicio> {
        return this.repository.findOne({ where: { id } });
      }


}
