import { Injectable } from '@nestjs/common';
import { Empleado } from './empleado.entity';
import { RegistrarEmpleadoDTO } from '../../../auth/interfaces/registrarEmpleado.dto';
import { DeepPartial } from 'typeorm';
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

  crear(empleado: DeepPartial<Empleado>): Promise<Empleado> {
    return this.repository.save(empleado);
  }

  buscar(id: number): Promise<Empleado> {
    return this.repository.findOne({ where: { id } });
  }
  buscarPorCuil(cuil: string): Promise<Empleado> {
    return this.repository.findOne({ where: { cuil } });
  }

}
