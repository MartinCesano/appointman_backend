import {Injectable} from '@nestjs/common';
import {RegistrarTipoServicioDTO} from '../interfaces/registrarTipoServicio';
import {SucursalService} from '../modules/sucursal/sucursal.service';
import {EmpresaService} from "../modules/empresa/empresa.service";
import {IUsuario} from "../../auth/interfaces/usuario.interface";
import { UsuarioService} from "../../auth/modules/usuario/usuario.service";


@Injectable()
export class GestorObtenerPrestadorServicio {
    constructor(private empresaService: EmpresaService, private usuarioService: UsuarioService) {
    }


    async getPrestadorServicio(usuario: IUsuario) {
        const empresa = await this.usuarioService.getEmpresa(usuario);
        return this.empresaService.getPrestadorServicio(empresa);
    }



}
