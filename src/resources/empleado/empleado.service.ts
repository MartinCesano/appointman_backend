import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { RegistrarEmpleadoDTO } from 'src/auth/interfaces/registrarEmpleado.dto';

@Injectable()
export class EmpleadoService {
  repository = Empleado;


  registrar(nuevoEmprendedor: RegistrarEmpleadoDTO): Promise<Empleado> {
    try {
      const empleado = new Empleado();
      Object.assign(empleado, nuevoEmprendedor);
      return this.repository.save(empleado);
    } catch (error) {
      throw new Error(`Error creating cliente: ${error.message}`);
    }
  }

  create(createEmpleadoDto: CreateEmpleadoDto) {
    return 'This action adds a new empleado';
  }

  findAll() {
    return `This action returns all empleado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }
}
