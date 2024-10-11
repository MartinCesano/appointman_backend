import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from './modules/jwt/jwt.service';
import { UsuarioService } from './modules/usuario/usuario.service';
import { LoginDTO } from './interfaces/login.dto';
import { compareSync } from 'bcrypt';
import { Request } from 'express';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { IUsuario } from './interfaces/usuario.interface';
import { RegistrarClienteDTO } from './interfaces/registrarCliente.dto';
import { RegistrarEmpleadoDTO } from './interfaces/registrarEmpleado.dto';
import { RegistrarEmprendedorDTO } from './interfaces/registrarEmprendedor.dto';
import {RegistrarUsuarioDTO} from "./interfaces/registrarUsuario.dto";

@Injectable()
export class AuthService implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, 
    private readonly userService: UsuarioService
  ) {}

  async register(body: RegistrarUsuarioDTO) {
    try {
      const user = await this.userService.register(body);
      
      return { status: 'created', user };
    } catch (error) {
      throw new HttpException('Error en el registro', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.userService.findByEmail(body.email);
    
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

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.validateToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // AuthGuard: Protección de rutas
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request & { user: IUsuario } = context.switchToHttp().getRequest();
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid Authorization header');
      }

      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      // Validar token y obtener payload
      const payload = await this.jwtService.getPayload(token);
      const user = await this.userService.findByEmail(payload.email);
      
      // Adjuntar usuario al request
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // Verificar permisos del usuario
  async canDo(usuario: IUsuario, nombrePermiso: string) {   
    const hasPermission = usuario.roles.some(role => 
      role.permisos.some(permiso => permiso.nombre === nombrePermiso)
    );
    
    if (!hasPermission) {
      throw new HttpException('El usuario no tiene el Permiso', 401);
    }
  
    return true;
  }
}
