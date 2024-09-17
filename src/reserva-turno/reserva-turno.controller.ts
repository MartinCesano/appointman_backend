import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaTurnoService } from './reserva-turno.service';
import { CreateReservaTurnoDto } from './dto/create-reserva-turno.dto';
import { UpdateReservaTurnoDto } from './dto/update-reserva-turno.dto';

@Controller('reserva-turno')
export class ReservaTurnoController {
  constructor(private readonly reservaTurnoService: ReservaTurnoService) {}

  @Post()
  create(@Body() createReservaTurnoDto: CreateReservaTurnoDto) {
    return this.reservaTurnoService.create(createReservaTurnoDto);
  }

  @Get()
  findAll() {
    return this.reservaTurnoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaTurnoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaTurnoDto: UpdateReservaTurnoDto) {
    return this.reservaTurnoService.update(+id, updateReservaTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaTurnoService.remove(+id);
  }
}
