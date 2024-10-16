import {HttpException, Injectable} from '@nestjs/common';
import {RegistrarUsuarioDTO} from '../interfaces/registrarUsuario.dto';
import {ClienteService} from 'src/gestion-reserva-cliente/modules/cliente/cliente.service';
import {EmpleadoService} from 'src/gestion-empresa/modules/empleado/empleado.service';
import {EmprendedorService} from 'src/gestion-empresa/modules/emprendedor/emprendedor.service';
import {Usuario} from '../modules/usuario/usuario.entity';
import {RolService} from '../modules/rol/rol.service';
import {hashSync} from 'bcrypt';
import {RegistrarClienteDTO} from '../interfaces/registrarCliente.dto';
import {RegistrarEmprendedorDTO} from '../interfaces/registrarEmprendedor.dto';
import {Emprendedor} from 'src/gestion-empresa/modules/emprendedor/emprendedor.entity';
import {Cliente} from 'src/gestion-reserva-cliente/modules/cliente/cliente.entity';
import {Empleado} from 'src/gestion-empresa/modules/empleado/empleado.entity';
import {RegistrarEmpleadoDTO} from '../interfaces/registrarEmpleado.dto';
import {UsuarioService} from '../modules/usuario/usuario.service';

@Injectable()
export class GestorRegistrarUsuarioService {

    constructor(
        private readonly clienteService: ClienteService,
        private readonly empleadoService: EmpleadoService,
        private readonly emprendedorService: EmprendedorService,
        private readonly rolService: RolService,
        private readonly usuarioService: UsuarioService
    ) {
    }

    async registrarUsuario(body: RegistrarUsuarioDTO) {
        try {
            const usuarioCreado = new Usuario();
            Object.assign(usuarioCreado, body);
            usuarioCreado.roles = [];
            if (body.roles) {
                for (const rol of body.roles) {
                    switch (rol) {
                        case "cliente":
                            usuarioCreado.cliente = await this.creacionCliente(body.cliente);
                            break;
                        case "empleado":
                            usuarioCreado.empleado = await this.creacionEmpleado(body.empleado);
                            break;
                        case "emprendedor":
                            usuarioCreado.emprendedor = await this.creacionEmprendedor(body.emprendedor);
                            break;
                    }
                    usuarioCreado.roles.push(await this.getRol(rol)); //asigno el rol correspondiente
                }
            }
            return await this.usuarioService.registrar(usuarioCreado);
        } catch (error) {
            throw new HttpException('Error de creación', 500);
        }
    }

    getRol(rol: string) {
        return this.rolService.buscarRolPorNombre(rol)
    }

    async creacionCliente(datosCliente: RegistrarClienteDTO): Promise<Cliente> {
        return await this.clienteService.registrar(datosCliente)
    }

    async creacionEmprendedor(datosEmprendedor: RegistrarEmprendedorDTO): Promise<Emprendedor> {
        return await this.emprendedorService.registrar(datosEmprendedor)
    }

    async creacionEmpleado(datosEmpleado: RegistrarEmpleadoDTO): Promise<Empleado> {
        return await this.empleadoService.registrar(datosEmpleado)
    }
}
