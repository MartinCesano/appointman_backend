import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaTurnoDto } from './create-reserva-turno.dto';

export class UpdateReservaTurnoDto extends PartialType(CreateReservaTurnoDto) {}
