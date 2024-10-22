import {Injectable} from '@nestjs/common';
import {Emprendedor} from './emprendedor.entity';
import {RegistrarEmprendedorDTO} from "../../../auth/interfaces/registrarEmprendedor.dto";
import {IEmprendedor} from "../../interfaces/emprendedor.interface";
import {IEmpresa} from "../../interfaces/empresa.interface";
import {EmpresaService} from "../empresa/empresa.service";
import {IServicio} from "../../interfaces/servicio.interface";


@Injectable()
export class EmprendedorService {
    repository = Emprendedor;

    constructor(private empresaService: EmpresaService) {
    }

    async registrar(nuevoEmprendedor: RegistrarEmprendedorDTO): Promise<Emprendedor> {
        try {
            const emprendedor = new Emprendedor();
            Object.assign(emprendedor, nuevoEmprendedor);
            return await this.repository.save(emprendedor);
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

    async getServicios(id: number): Promise<IServicio[]> {
         const emprendedor = await this.repository.findOne({
            where: {id},
            relations: ['empresa']
        })

        return this.empresaService.getServicios(emprendedor.empresa.id)
    }


}
