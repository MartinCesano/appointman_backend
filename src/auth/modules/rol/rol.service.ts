import { Injectable, HttpException, NotFoundException} from '@nestjs/common';
import { Rol } from './rol.entity';
import { DeepPartial, In } from 'typeorm';
import { PermisoService } from '../permiso/permiso.service';


@Injectable()
export class RolService {
    repository = Rol; 
    constructor(
      private permissionsService: PermisoService
    ) {}

    async findRoles() {
        try {
            return this.repository.find();
        } catch (error) {   
            throw new HttpException('Find all Roles error', 500)
        }
    }
    
    async findRoleById(codigo: number): Promise<Rol> {
        const role = await this.repository.findOne({where:{codigo}});
        if (!role) {
            throw new NotFoundException(`Role with id ${codigo} not found`);
        }
        return role;
    }

    async buscarRolPorNombre (nombre: string): Promise<Rol> {
        const role = await this.repository.findOne({where:{nombre}});
        if (!role) {
            throw new NotFoundException(`Role with name ${nombre} not found`);
        }
        return role;
    }

    async assignPermissionToRole(idRole: number, body: { permissionId: number }) {
        const role = await this.repository.findOne({
            where: { codigo: idRole },
            relations: ['permissions'],
          });

        if (!role) {
            throw new NotFoundException(`Role with id ${idRole} not found`);
        }

        const permission = await this.permissionsService.findPermissionById(body.permissionId );

        if (!permission) {
            throw new NotFoundException(`Permission with ID ${body.permissionId} not found`);
          }
        if (!role.permisos) {
            role.permisos = [];
        }

        role.permisos.push(permission); 
        await role.save();
        
        return role;
    }

    async updateRole(codigo: number, role: DeepPartial<Rol>) {
        const query = this.repository.createQueryBuilder('role').where('role.codigo = :codigo', { codigo });
        const roleActual = await query.getOne();
        this.repository.merge(roleActual, role);
        if (!roleActual) {
            throw new NotFoundException(`Role with id ${codigo} not found`);
        }
        return await this.repository.save(roleActual);
    }

    async deleteRole(codigo: number){
        const roleRemove = await this.repository.findOneBy({
            codigo: codigo
        })
        return await this.repository.remove(roleRemove);
    }

    createRoles(role: DeepPartial<Rol>) {
        try {
            return this.repository.save(role);
        } catch (error) {
            throw new HttpException('Create Role error', 500)
        }
    }

}
