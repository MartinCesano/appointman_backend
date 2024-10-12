import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrestadorServicioService } from './prestador-servicio.service';

@Controller('prestador-servicio')
export class PrestadorServicioController {
  constructor(private readonly prestadorServicioService: PrestadorServicioService) {}
}
