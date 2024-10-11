import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { ClienteService } from '../../../gestion-reserva-cliente/modules/cliente/cliente.service';
import { PermisoService } from '../permiso/permiso.service';
import { JwtService } from '@nestjs/jwt';
import { RolService } from '../rol/rol.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { RegistrarUsuarioDTO } from 'src/auth/interfaces/registrarUsuario.dto';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        PermisoService,
        JwtService,
        RolService,
        ClienteService,
        {
          provide: getRepositoryToken(Usuario),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUsers', () => {
    it('debería devolver una lista de usuarios', async () => {
      const usuarios: Usuario[] = [
        { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan.perez@example.com' } as Usuario,
        { id: 2, nombre: 'Ana', apellido: 'García', email: 'ana.garcia@example.com' } as Usuario,
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(usuarios);

      const result = await service.findUsers();
      expect(result).toEqual(usuarios);
      expect(repository.find).toHaveBeenCalled();
    });

    it('debería lanzar un error si ocurre un problema al buscar usuarios', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('Find all users error'));

      await expect(service.findUsers()).rejects.toThrow(HttpException);
    });
  });
describe('register', () => {
  it('debería registrar un usuario y devolver el usuario creado con status code 201', async () => {
    const usuarioDTO = {
      nombre: 'Carlos',
      apellido: 'Sánchez',
      email: 'carlos.sanchez@example.com',
      contrasena: 'password123',
      telefono: '1234567890',
      roles: ['cliente']
    };

    const usuarioCreado = {
      id: 1,
      ...usuarioDTO,
      contrasena: expect.any(String)
    };

    jest.spyOn(repository, 'save').mockResolvedValue(usuarioCreado as Usuario);

    const result = await service.register(usuarioDTO);
    expect(result).toEqual('se guardo');
    expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
      email: usuarioDTO.email,
      telefono: usuarioDTO.telefono
    }));
  });

  it('debería lanzar un error si se intenta registrar un usuario con el mismo email o teléfono', async () => {
    const usuarioDTO = {
      nombre: 'Carlos',
      apellido: 'Sánchez',
      email: 'carlos.sanchez@example.com',
      contrasena: 'password123',
      telefono: '1234567890',
      roles: ['cliente']
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(RegistrarUsuarioDTO as Usuario);

    await expect(service.register(usuarioDTO)).rejects.toThrow(HttpException);
  });
});
});