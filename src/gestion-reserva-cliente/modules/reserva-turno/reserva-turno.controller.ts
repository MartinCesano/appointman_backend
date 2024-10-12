import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaTurnoService } from './reserva-turno.service';

@Controller('reserva-turno')
export class ReservaTurnoController {
  constructor(private readonly reservaTurnoService: ReservaTurnoService) {}

}
