import {Injectable} from '@nestjs/common';
import { RegistrarTipoServicioDTO } from '../interfaces/registrarTipoServicio';
import { ServicioService } from '../modules/servicio/servicio.service';
import { SucursalService } from '../modules/sucursal/sucursal.service';

@Injectable()
export class GestorRegistrarTipoServicioService {
    constructor(private servicioService: ServicioService) {
    }

    async registrarTipoServicio(datos: RegistrarTipoServicioDTO) {
    // verifica que el tiempo de duracion sea mayor a 0 y que sea multiplo a un intervalo de 5 minutos, es decir que sea multiplo de 5
        // por el momento no buscamos de cuanto es el intervalo de tiempo, por lo que solo verificamos que sea multiplo de 5
        if (datos.duracion <= 0 || datos.duracion % 5 != 0) {
            return {error: "La duracion debe ser mayor a 0 y multiplo de 5"};
        }
        // como se verifico que la duracion es correcta, se procede a registrar el tipo de servicio

        // obtengo la sucursal
        const sucursalService = new SucursalService();
        const sucursal = await sucursalService.getSucursalById(datos.idSucursal);
        const servicioNuevo = {
            nombre: datos.nombre,
            duracion: datos.duracion,
            precio: datos.precio,
            sucursal: [sucursal]
        }

        const response = await this.servicioService.create(servicioNuevo);


        return response;
    }
}
