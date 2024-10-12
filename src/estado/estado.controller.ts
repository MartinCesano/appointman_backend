import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoService } from './estado.service';

@Controller('estado')
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}
}
