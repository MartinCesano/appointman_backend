import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { DeepPartial } from 'typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { Usuario } from './usuario.entity';
import { IUsuario } from '../../interfaces/usuario.interface';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usersService: UsuarioService) {}

  @Post(':id/permissions')
  async assignPermissionToUser(@Param('id') idUser: number, @Body() body: { idPermiso: number }): Promise<Usuario> {
    return await this.usersService.assignPermissionToUser(idUser, body);
  }


  @Get()
  async findUsers(): Promise<Usuario[]> {
    return await this.usersService.findUsers();
  }

  @Put(':id')
  async updateUserById(@Param('id') id: number, @Body() bodyUpdateUsers: DeepPartial<Usuario>): Promise<Usuario> {
    return await this.usersService.updateUserById(id, bodyUpdateUsers);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<Usuario> {
    return await this.usersService.deleteUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('can-do/:permission') // Verifica si el usuario autenticado tiene el permiso especificado
  canDo(@Param('user') user: IUsuario, @Param('permission') permission: string): Promise<boolean> {
    return this.usersService.canDo(user,permission);
  }

}
