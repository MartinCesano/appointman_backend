import { Injectable, HttpException } from '@nestjs/common';
import { CreateHoraDto } from './dto/create-hora.dto';
import { UpdateHoraDto } from './dto/update-hora.dto';
import { Hora } from './entities/hora.entity';

@Injectable()
export class HoraService {
  repository = Hora;

  create(dto: CreateHoraDto){
    const hora = this.repository.create(dto);
    return this.repository.save(hora);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `Esta acción devuelve la hora #${id}`;
  }

  update(id: number, updateHoraDto: UpdateHoraDto) {
    return this.repository.update(id, updateHoraDto);
  }

  remove(id: number) {
    try {
      return this.repository.delete(id);
    } catch (error) {
      throw new HttpException('No se pudo borrar la hora.', error);
    }
  }
}
