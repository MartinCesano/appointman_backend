import { Injectable } from '@nestjs/common';
import { Sucursal } from './sucursal.entity';
import { ISucursal } from '../../interfaces/sucursal.interface';
import { IHorario } from '../../../gestion-reserva-cliente/interfaces/horario.interface';

@Injectable()
export class SucursalService {
    repository = Sucursal;

    constructor() {
    }
    getSucursalById(id: number): Promise<ISucursal> {
        try {
            return this.repository.findOne({ where: { id }});
        } catch (error) {
            throw new Error(`Error getting sucursal: ${error.message}`);
        }
    }

    async agregarDisponibilidad(id: number, horario: IHorario) {
        // const sucursal = await this.getSucursalById(id);
        // if (!sucursal) {
        //     throw new Error(`Sucursal with id ${id} not found`);
        // }
        // if (!sucursal.horario) {
        //     sucursal.horario = [];
        // }
        // sucursal.horario.push(horario);
        // await this.repository.save(sucursal as Sucursal);
    }

}
