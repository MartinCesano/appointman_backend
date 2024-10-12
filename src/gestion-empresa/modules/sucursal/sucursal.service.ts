import { Injectable } from '@nestjs/common';
import { Sucursal } from './sucursal.entity';

@Injectable()
export class SucursalService {
    repository = Sucursal;

    constructor() {
    }
    getSucursalById(id: number): Promise<Sucursal> {
        try {
            return this.repository.findOne({ where: { id }});
        } catch (error) {
            throw new Error(`Error getting sucursal: ${error.message}`);
        }
    }

}
