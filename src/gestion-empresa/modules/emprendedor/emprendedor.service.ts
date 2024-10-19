import {Injectable} from '@nestjs/common';
import {Emprendedor} from './emprendedor.entity';
import {RegistrarEmprendedorDTO} from "../../../auth/interfaces/registrarEmprendedor.dto";
import {IEmprendedor} from "../../interfaces/emprendedor.interface";
import {IEmpresa} from "../../interfaces/empresa.interface";


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

    getEmpresa(id: number): Promise<IEmpresa> {
        return this.repository.findOne({
            where: {id},
            relations: ['empresa']
        }).then(emprendedor => emprendedor.empresa as IEmpresa);
    }


}
