import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoraService } from './hora.service';
import { CreateHoraDto } from './dto/create-hora.dto';
import { UpdateHoraDto } from './dto/update-hora.dto';

@Controller('hora')
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
    return this.horaService.findOne(+id);
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
