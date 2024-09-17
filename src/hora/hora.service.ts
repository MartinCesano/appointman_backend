import { Injectable } from '@nestjs/common';
import { CreateHoraDto } from './dto/create-hora.dto';
import { UpdateHoraDto } from './dto/update-hora.dto';

@Injectable()
export class HoraService {
  create(createHoraDto: CreateHoraDto) {
    return 'This action adds a new hora';
  }

  findAll() {
    return `This action returns all hora`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hora`;
  }

  update(id: number, updateHoraDto: UpdateHoraDto) {
    return `This action updates a #${id} hora`;
  }

  remove(id: number) {
    return `This action removes a #${id} hora`;
  }
}
