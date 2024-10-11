import { HttpException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDTO } from '../../interfaces/login.dto';
import { RegisterDTO } from '../../interfaces/register.dto';
import { IUsuario } from '../../interfaces/user.interface';
import { Usuario } from './usuario.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '../jwt/jwt.service';
import { DeepPartial, In, Repository, } from 'typeorm';
import { PermisoService } from '../permiso/permiso.service';
import { RolService } from '../rol/rol.service';
import { ClienteService } from 'src/gestion-reserva-cliente/modules/cliente/cliente.service';
import { EmpleadoService } from 'src/resources/empleado/empleado.service';
import { EmprendedorService } from 'src/resources/emprendedor/emprendedor.service';
import { ICliente } from 'src/gestion-reserva-cliente/interfaces/cliente.interface';
import { IEmpleado } from 'src/interfaces/empleado.interface';
import { IEmprendedor } from 'src/interfaces/emprendedor.interface';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export abstract class UsuarioService {
  

  constructor(
    private permissionsService: PermisoService,
    private jwtService: JwtService,
    @InjectRepository (Usuario)
    private repository: Repository<Usuario>,
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
    if (usuario.rol.nombre === nombrePermiso){
      hasPermission = true;
    }
    if (!hasPermission) {
      throw new HttpException('El usuario no tiene el Permiso', 401);
    }
    return hasPermission;
  }

  async registrar(userData: RegisterDTO) {
    
    return {
      statusCode: 201,
      message: 'Usuario creado con éxito',
    };
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

}
