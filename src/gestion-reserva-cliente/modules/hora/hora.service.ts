import { Injectable, HttpException } from '@nestjs/common';
import { Hora } from './hora.entity';
import { IHora} from "../../interfaces/hora.interface";
import {createQueryBuilder} from "typeorm";

@Injectable()
export class HoraService {
    repository: Hora;
    constructor() {
    }


    /**
     * @description Metodo que retorna los multiplos de horas. obtiene el multiplo comun mas grande de las horas.
     * @returns {Promise<number>} Retorna un numero entero que representa el multiplo comun mas grande de las horas.
     */
    async getMultiplosHoras(): Promise<number> {
        return 15;
    }


    /**
     * @description Metodo que inserta un array de horas en la base de datos en una sola consulta.
     * @param horas Array de horas a insertar.
     * @returns {Promise<void>}
     */
    async bulkInsert(horas: IHora[]): Promise<Hora[]> {
        try {
            const result = await Hora.createQueryBuilder()
                .insert()
                .into(Hora)
                .values(horas)
                .execute();
            return result.generatedMaps as Hora[];
        } catch (error) {
            console.error('Error al insertar horas:', error);
            throw new HttpException('Error al insertar horas', 500);
        }
    }


}
