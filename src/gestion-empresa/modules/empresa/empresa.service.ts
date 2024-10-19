import {Injectable} from '@nestjs/common';
import {CreateEmpresaDto} from './dto/create-empresa.dto';
import {UpdateEmpresaDto} from './dto/update-empresa.dto';
import {ISucursal} from "src/gestion-empresa/interfaces/sucursal.interface";
import {Empresa} from "./empresa.entity";
import {IEmpresa} from "src/gestion-empresa/interfaces/empresa.interface";

@Injectable()
export class EmpresaService {
    repository = Empresa;

    getEmpresaById(id: number): Promise<IEmpresa> {
        try {
            return this.repository.findOne({where: {id}});
        } catch (error) {
            throw new Error(`Error getting sucursal: ${error.message}`);
        }
    }

    create(createEmpresaDto: CreateEmpresaDto) {
        return 'This action adds a new empresa';
    }

    findAll() {
        return `This action returns all empresa`;
    }

    findOne(id: number) {
        return `This action returns a #${id} empresa`;
    }

    update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
        return `This action updates a #${id} empresa`;
    }

    remove(id: number) {
        return `This action removes a #${id} empresa`;
    }
}
