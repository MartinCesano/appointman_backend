import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/resources/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permite el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // El usuario autenticado debería estar disponible en `request.user`
    
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado.');
    }

    // Aquí buscamos el usuario para asegurarnos de que tenga los roles necesarios
    const userEntity = await this.usersService.findByEmail(user.email);
    if (!userEntity || !userEntity.roles || userEntity.roles.length === 0) {
      throw new ForbiddenException('El usuario no tiene roles asignados.');
    }

    const hasRole = userEntity.roles.some(role => requiredRoles.includes(role.nombre)); // antes estaba role.code
    if (!hasRole) {
      throw new ForbiddenException('El usuario no tiene el rol requerido.');
    }

    return true;
  }
}
