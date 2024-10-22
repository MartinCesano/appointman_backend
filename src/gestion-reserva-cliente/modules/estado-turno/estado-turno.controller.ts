import { Controller } from '@nestjs/common';
import { EstadoTurnoService } from './estado-turno.service';

@Controller('estado-turno')
export class EstadoTurnoController {
  constructor(private readonly estadoTurnoService: EstadoTurnoService) {}
}
