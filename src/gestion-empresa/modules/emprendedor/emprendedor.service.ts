import { Injectable } from '@nestjs/common';
import { Emprendedor } from './emprendedor.entity';
import {RegistrarEmprendedorDTO} from "../../../auth/interfaces/registrarEmprendedor.dto";

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


}
