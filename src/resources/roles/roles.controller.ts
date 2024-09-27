import { Body, Param, Post, Get, Put, Delete, Controller  } from '@nestjs/common';
import { RolesService } from './roles.service';
import { DeepPartial } from 'typeorm';
import { Rol } from 'src/resources/roles/entities/role.entity';

@Controller('roles')
export default class RolesController {
    constructor(private rolesService: RolesService) {}
    
    @Post(':id/permissions')
    async assignPermissionToRole(@Param('id') idRole: number, @Body() body: { permissionId: number }): Promise<Rol> {
        return await this.rolesService.assignPermissionToRole(idRole, body);
    }

    @Get()
    async findRoles() {
        return await this.rolesService.findRoles();
    }

    @Post()
    async createRoles(@Body() bodyCreateRoles: DeepPartial<Rol>): Promise<Rol> {
        return await this.rolesService.createRoles(bodyCreateRoles);
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: number): Promise<Rol> {
        return await this.rolesService.deleteRole(id);
    }
    
    @Put(':id')
    async updateRole(@Param('id') id: number, @Body() bodyUpdateRole: DeepPartial<Rol>): Promise<Rol>{
        return await this.rolesService.updateRole(id, bodyUpdateRole);
    }

    
}
