import { Body, Param, Post, Get, Put, Delete, Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permiso } from 'src/permissions/entities/permission.entity';
import { DeepPartial } from 'typeorm';

@Controller('permissions')
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}
    @Post()
    async createPermissions( @Body() bodyCreatePermissions: DeepPartial<Permiso>): Promise<Permiso> {
        return await this.permissionsService.createPermissions(bodyCreatePermissions);
    }

    @Get()
    async findPermissions(): Promise<Permiso[]>{
        return await this.permissionsService.findPermissions();
    }

    @Put(':id')
        async updatePermissionById(@Param('id') id: number, @Body() bodyUpdatePermissions: DeepPartial<Permiso>): Promise<Permiso> {
            return await this.permissionsService.updatePermissionById(id, bodyUpdatePermissions);
    }

    @Delete(':id')
        async deletePermissionById(@Param('id') id: number): Promise<Permiso> {
            return await this.permissionsService.deletePermissionById(id);
    }

    @Get(':id')
        async findPermissionById(@Param('id') id: number): Promise<Permiso> {
            return await this.permissionsService.findPermissionById(id);
    }
}
