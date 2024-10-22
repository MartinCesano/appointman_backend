import { Controller } from '@nestjs/common';
import { EstadoReservaService } from './estado-reserva.service';

@Controller('estado-reserva')
export class EstadoReservaController {
  constructor(private readonly estadoReservaService: EstadoReservaService) {}
}
