import { HttpException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { IUsuario } from 'src/interfaces/user.interface';
import { IPermiso } from 'src/interfaces/permisos.interface';
import { UserEntity } from './user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository, DeepPartial} from 'typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class UsersService {
  repository = UserEntity; 
  constructor(
    private permissionsService: PermissionsService,
    private jwtService: JwtService, // Inyecta JwtService
    private rolesService: RolesService
  ) {}

  async createUsers(users: DeepPartial<UserEntity>) {
    try {
      return await this.repository.save(users);
  } catch (error) {
      throw new HttpException('Create product error', 500)
  }
  }

  async findUsers(): Promise<UserEntity[]>{
      try {            
        return await this.repository.find();
    } catch (error) {
        throw new HttpException('Find all products error', 500)
    } 
  }



  async updateUserById(id: number, user: DeepPartial<UserEntity>): Promise<UserEntity> {
    const query = this.repository.createQueryBuilder('user')
        .where('user.id = :id', { id });
    const userActual = await query.getOne();
    this.repository.merge(userActual, user);
    if (!userActual) {
        throw new NotFoundException(`User with id ${id} not found`);
    }
    return await this.repository.save(userActual);
  }

  async deleteUserById(id: number): Promise <UserEntity> {
    const userRemove = await this.repository.findOneBy({
        id: id
    })
    return await this.repository.remove(userRemove);
  }

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  async canDo(usuario: IUsuario, nombrePermiso: string) {   
    const hasPermission = usuario.roles.some(role => 
      role.permisos.some(permiso => permiso.nombre === nombrePermiso)
    );
    
    if (!hasPermission) {
      throw new HttpException('El usuario no tiene el Permiso', 401);
    }
  
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.contrasena = hashSync(user.contrasena, 10);
      await this.repository.save(user);
      return { status: 'created'};
    } catch (error) {
      throw new HttpException('Error de creacion',500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (user == null) {
      throw new UnauthorizedException();
    }

    const compareResult = compareSync(body.password, user.contrasena);
    if (!compareResult) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.generateToken({ email: user.email }),
      refreshToken: this.jwtService.generateToken(
        { email: user.email },
        'refresh',
      ),
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOneBy({ email });
  }


  async assignPermissionToUser(idUsuario: number, body: { idPermiso: number }): Promise<UserEntity> {
    
    const user = await this.repository.findOne({
      where: { id: idUsuario },
      relations: ['permissions'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${idUsuario} not found`);
    }
    const permission = await this.permissionsService.findPermissionById(body.idPermiso );

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

  async assignRoleToUser(userId: number, body: { roleId: number }): Promise<UserEntity> {
    
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