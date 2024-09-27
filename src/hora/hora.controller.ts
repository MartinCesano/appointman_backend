import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HoraService } from './hora.service'; // Asegúrate de que esta ruta sea correcta
import { CreateHoraDto } from './dto/create-hora.dto'; // Asegúrate de que esta ruta sea correcta
import { UpdateHoraDto } from './dto/update-hora.dto'; // Asegúrate de que esta ruta sea correcta

@Controller('hora') // Cambiado de 'appointment-time' a 'hora'
export class HoraController {
  constructor(private readonly horaService: HoraService) {}

  @Post()
  create(@Body() createHoraDto: CreateHoraDto) {
    return this.horaService.create(createHoraDto);
  }

  @Get()
  findAll() {
    return this.horaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horaService.findOne(+id); // Asegúrate de que el ID se convierta a número
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoraDto: UpdateHoraDto) {
    return this.horaService.update(+id, updateHoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horaService.remove(+id);
  }
}
