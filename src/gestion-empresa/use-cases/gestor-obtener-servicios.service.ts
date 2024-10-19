import {Injectable} from '@nestjs/common';
import {RegistrarTipoServicioDTO} from '../interfaces/registrarTipoServicio';
import {ServicioService} from '../modules/servicio/servicio.service';
import {SucursalService} from '../modules/sucursal/sucursal.service';
import {EmpresaService} from "../modules/empresa/empresa.service";
import {IUsuario} from "../../auth/interfaces/usuario.interface";
import { UsuarioService} from "../../auth/modules/usuario/usuario.service";


@Injectable()
export class GestorObtenerServiciosService {
    constructor(private servicioService: ServicioService, private usuarioService: UsuarioService) {
    }


    getServicios(usuario: IUsuario) {
        return this.usuarioService.getServicios(usuario.id)
    }


}
