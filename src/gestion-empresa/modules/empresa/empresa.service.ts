import {Injectable} from '@nestjs/common';
import {CreateEmpresaDto} from './dto/create-empresa.dto';
import {UpdateEmpresaDto} from './dto/update-empresa.dto';
import {ISucursal} from "src/gestion-empresa/interfaces/sucursal.interface";
import {Empresa} from "./empresa.entity";
import {IEmpresa} from "src/gestion-empresa/interfaces/empresa.interface";
import {IServicio} from "../../interfaces/servicio.interface";
import {IHorario} from "../../../gestion-reserva-cliente/interfaces/horario.interface";
import {Sucursal} from "../sucursal/sucursal.entity";

@Injectable()
export class EmpresaService {
    repository = Empresa;

    getEmpresaById(id: number): Promise<IEmpresa> {
        try {
            return this.repository.findOne({
                where: { id },
                relations: ['horario'], // Cargar la relación 'horario'
            });
        } catch (error) {
            throw new Error(`Error getting empresa: ${error.message}`);
        }
    }

    getHorarios(id: number): Promise<IHorario[]> {
        return this.repository.findOne({
            where: {id},
            relations: ['horario'] // Ensure this matches the property name in the Empresa entity
        }).then(empresa => {
            if (!empresa) {
                throw new Error(`Empresa with id ${id} not found`);
            }
            return empresa.horario as IHorario[];
        });
    }


    getServicios(id: number): Promise<IServicio[]> {
        return this.repository.findOne({
            where: {id},
            relations: ['servicio'] // Ensure this matches the property name in the Empresa entity
        }).then(empresa => {
            if (!empresa) {
                throw new Error(`Empresa with id ${id} not found`);
            }
            return empresa.servicio as IServicio[];
        });
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

    async agregarHorario(id: number, horario: IHorario) {
        const empresa = await this.getEmpresaById(id);
        if (!empresa) {
            throw new Error(`Sucursal with id ${id} not found`);
        }
        empresa.horario.push(horario);
        await this.repository.save(empresa as Empresa);
    }

}
