import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TurnoService } from './turno.service';


@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

}
