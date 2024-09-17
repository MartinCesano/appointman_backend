import { PartialType } from '@nestjs/mapped-types';
import { CreatePrestadorServicioDto } from './create-prestador-servicio.dto';

export class UpdatePrestadorServicioDto extends PartialType(CreatePrestadorServicioDto) {}
