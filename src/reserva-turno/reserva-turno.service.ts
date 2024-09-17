import { Injectable } from '@nestjs/common';
import { CreateReservaTurnoDto } from './dto/create-reserva-turno.dto';
import { UpdateReservaTurnoDto } from './dto/update-reserva-turno.dto';

@Injectable()
export class ReservaTurnoService {
  create(createReservaTurnoDto: CreateReservaTurnoDto) {
    return 'This action adds a new reservaTurno';
  }

  findAll() {
    return `This action returns all reservaTurno`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservaTurno`;
  }

  update(id: number, updateReservaTurnoDto: UpdateReservaTurnoDto) {
    return `This action updates a #${id} reservaTurno`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservaTurno`;
  }
}
