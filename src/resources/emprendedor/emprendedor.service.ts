import { Injectable } from '@nestjs/common';
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto';
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto';

@Injectable()
export class EmprendedorService {
  create(createEmprendedorDto: CreateEmprendedorDto) {
    return 'This action adds a new emprendedor';
  }

  findAll() {
    return `This action returns all emprendedor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emprendedor`;
  }

  update(id: number, updateEmprendedorDto: UpdateEmprendedorDto) {
    return `This action updates a #${id} emprendedor`;
  }

  remove(id: number) {
    return `This action removes a #${id} emprendedor`;
  }
}
