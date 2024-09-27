import { Injectable } from '@nestjs/common';
import { CreatePrestadorServicioDto } from './dto/create-prestador-servicio.dto';
import { UpdatePrestadorServicioDto } from './dto/update-prestador-servicio.dto';

@Injectable()
export class PrestadorServicioService {
  create(createPrestadorServicioDto: CreatePrestadorServicioDto) {
    return 'This action adds a new prestadorServicio';
  }

  findAll() {
    return `This action returns all prestadorServicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prestadorServicio`;
  }

  update(id: number, updatePrestadorServicioDto: UpdatePrestadorServicioDto) {
    return `This action updates a #${id} prestadorServicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestadorServicio`;
  }
}
