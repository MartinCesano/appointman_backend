import { HttpException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDTO } from '../../interfaces/login.dto';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Usuario } from './usuario.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '../jwt/jwt.service';
import { DeepPartial, In, Repository, } from 'typeorm';
import { PermisoService } from '../permiso/permiso.service';
import { RolService } from '../rol/rol.service';
import { RegistrarUsuarioDTO } from 'src/auth/interfaces/registrarUsuario.dto';
import { RegistrarClienteDTO} from "../../interfaces/registrarCliente.dto";
import {ClienteService} from "../../../gestion-reserva-cliente/modules/cliente/cliente.service";
import {Cliente} from "../../../gestion-reserva-cliente/modules/cliente/entities/cliente.entity";
import {ICliente} from "../../../gestion-reserva-cliente/interfaces/cliente.interface";

@Injectable()
export class UsuarioService {
  repository = Usuario

  constructor(
    private permissionsService: PermisoService,
    private jwtService: JwtService,
    private rolesService: RolService,
    private clienteService: ClienteService,
  ) {}

  async findUsers(): Promise<Usuario[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new HttpException('Find all users error', 500);
    }
  }

  async updateUserById(id: number, user: DeepPartial<Usuario>): Promise<Usuario> {
    const query = this.repository.createQueryBuilder('user')
        .where('user.id = :id', { id });
    const userActual = await query.getOne();

    if (!userActual) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.repository.merge(userActual, user);
    return await this.repository.save(userActual);
  }

  async deleteUserById(id: number): Promise<Usuario> {
    const userRemove = await this.repository.findOneBy({ id });

    if (!userRemove) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return await this.repository.remove(userRemove);
  }

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  async canDo(usuario: IUsuario, nombrePermiso: string) {
    let hasPermission = false;
    if (usuario.roles.some(rol => rol.nombre === nombrePermiso)){
      hasPermission = true;
    }
    if (!hasPermission) {
      throw new HttpException('El usuario no tiene el Permiso', 401);
    }
    return hasPermission;
  }

  async register(body: RegistrarUsuarioDTO) {
    try {
      const user = new Usuario();
      Object.assign(user, body);
      user.contrasena = hashSync(user.contrasena, 10);
      //creo un switch
      if (body.roles) {
        for (const rol of body.roles) {
          switch (rol) {
            case "cliente":
              user.cliente = await this.creacionCliente(body.cliente);
              user.roles = [await this.getRol("cliente")];
              break;
            case "empleado":
              console.log("empleado");
              break;
            case "emprendedor":
              console.log("emprendedor");
              break;
          }
        }
      }
      return await this.repository.save(user);
    } catch (error) {
      throw new HttpException('Error de creación', 500);
    }
  }

  async creacionCliente(datosCliente: RegistrarClienteDTO): Promise<Cliente> {
    return await this.clienteService.registrar(datosCliente)
  }




  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const compareResult = compareSync(body.contrasena, user.contrasena);

    if (!compareResult) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.generateToken({ email: user.email }),
      refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
    };
  }

  async findByEmail(email: string): Promise<Usuario> {
    return await this.repository.findOneBy({ email });
  }

  async assignPermissionToUser(idUsuario: number, body: { idPermiso: number }): Promise<Usuario> {
    const user = await this.repository.findOne({
      where: { id: idUsuario },
      relations: ['permisos'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${idUsuario} not found`);
    }

    const permission = await this.permissionsService.findPermissionById(body.idPermiso);

    if (!permission) {
      throw new NotFoundException(`Permission with ID ${body.idPermiso} not found`);
    }

    if (!user.permisos) {
      user.permisos = [];
    }

    user.permisos.push(permission);
    await user.save();

    return user;
  }

  getRol(rol: string) {
    return this.rolesService.buscarRolPorNombre(rol)
  }

  async assignRoleToUser(userId: number, body: { roleId: number }): Promise<Usuario> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const role = await this.rolesService.findRoleById(body.roleId);

    if (!role) {
      throw new NotFoundException(`Role with ID ${body.roleId} not found`);
    }

    if (!user.roles) {
      user.roles = [];
    }

    user.roles.push(role);
    await user.save();

    return user;
  }

}
