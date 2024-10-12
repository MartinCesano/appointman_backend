import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmprendedorService } from './emprendedor.service';

@Controller('emprendedor')
export class EmprendedorController {
  constructor(private readonly emprendedorService: EmprendedorService) {}


}
