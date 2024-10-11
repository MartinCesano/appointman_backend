import { Injectable } from '@nestjs/common';
import { CreateEmprendedorDto } from './dto/create-emprendedor.dto';
import { UpdateEmprendedorDto } from './dto/update-emprendedor.dto';
import { Emprendedor } from './entities/emprendedor.entity';
import {RegistrarEmprendedorDTO} from "../../auth/interfaces/registrarEmprendedor.dto";

@Injectable()
export class EmprendedorService {
  repository = Emprendedor;

  registrar(nuevoEmprendedor: RegistrarEmprendedorDTO): Promise<Emprendedor> {
    try {
      const emprendedor = new Emprendedor();
      Object.assign(emprendedor, nuevoEmprendedor);
      return this.repository.save(emprendedor);
    } catch (error) {
      throw new Error(`Error creating cliente: ${error.message}`);
    }
  }

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
