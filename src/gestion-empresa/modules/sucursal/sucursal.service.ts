import { Injectable } from '@nestjs/common';
import { Sucursal } from './sucursal.entity';
import { ISucursal } from '../../interfaces/sucursal.interface';

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

}
