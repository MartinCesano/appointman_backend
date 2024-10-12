import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HoraService } from './hora.service'; // Asegúrate de que esta ruta sea correcta

@Controller('hora') // Cambiado de 'appointment-time' a 'hora'
export class HoraController {
  constructor(private readonly horaService: HoraService) {}

}
