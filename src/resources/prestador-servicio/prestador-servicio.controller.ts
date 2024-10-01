import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrestadorServicioService } from './prestador-servicio.service';
import { CreatePrestadorServicioDto } from './dto/create-prestador-servicio.dto';
import { UpdatePrestadorServicioDto } from './dto/update-prestador-servicio.dto';

@Controller('prestador-servicio')
export class PrestadorServicioController {
  constructor(private readonly prestadorServicioService: PrestadorServicioService) {}

  @Post()
  create(@Body() createPrestadorServicioDto: CreatePrestadorServicioDto) {
    return this.prestadorServicioService.create(createPrestadorServicioDto);
  }

  @Get()
  findAll() {
    return this.prestadorServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prestadorServicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrestadorServicioDto: UpdatePrestadorServicioDto) {
    return this.prestadorServicioService.update(+id, updatePrestadorServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prestadorServicioService.remove(+id);
  }
}
