import { Controller, Get, Post, Body, HttpCode, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './interfaces/login.dto';
import { RegistrarUsuarioDTO } from './interfaces/registrarUsuario.dto';
import { RegistrarClienteDTO } from './interfaces/registrarCliente.dto';
import { RegistrarEmpleadoDTO } from './interfaces/registrarEmpleado.dto';
import { RegistrarEmprendedorDTO } from './interfaces/registrarEmprendedor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authorizationService: AuthService) {}

  @Get()
    getHello(): string {
        return 'status:Hola loquito todo correcto, aguante el dortmund';
    }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    return await this.authorizationService.login(body);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegistrarClienteDTO | RegistrarEmpleadoDTO | RegistrarEmprendedorDTO) {
    return await this.authorizationService.register(body);
  }

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() body: { token: string }) {
    const isValid = await this.authorizationService.validateToken(body.token);
    if (!isValid) {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
    }
    return { valid: true };
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: { refreshToken: string }) {
    return await this.authorizationService.refreshToken(body.refreshToken);
  }
}
