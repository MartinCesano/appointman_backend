import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RegisterDTO } from '../interfaces/register.dto';
import { JwtService } from '../jwt/jwt.service';
import { PermissionsService } from '../permissions/permissions.service';
import { RolesService } from '../roles/roles.service';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsersService - register', () => {
  let usersService: UsersService;
  let usersRepository: Repository<UserEntity>;

  const mockUsersRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockJwtService = {
    generateToken: jest.fn(),
    refreshToken: jest.fn(),
  };

  const mockPermissionsService = {
    findPermissionById: jest.fn(),
  };

  const mockRolesService = {
    findRoleById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(UserEntity), useValue: mockUsersRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: PermissionsService, useValue: mockPermissionsService },
        { provide: RolesService, useValue: mockRolesService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('debería crear un usuario correctamente', async () => {
    // Arrange
    const registerData: RegisterDTO = {
      email: 'valentinachiapero@gmail.com',
      password: 'contra1234',
      firstName: 'valentina',
      lastName: 'chiapero',
    };

    const hashedPassword = 'hashedPassword123';

    jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);

    const savedUser = {
      ...registerData,
      id: 1,
      password: hashedPassword,
    } as UserEntity;

    mockUsersRepository.save.mockResolvedValue(savedUser);

    // Act
    const result = await usersService.register(registerData);

    // Assert
    expect(bcrypt.hashSync).toHaveBeenCalledWith(registerData.password, 10);
    expect(mockUsersRepository.save).toHaveBeenCalledWith({
      ...registerData,
      password: hashedPassword,
    });
    expect(result).toEqual({ status: 'created' });
  });

  it('debería lanzar una excepción si el registro falla', async () => {
    // Arrange
    const registerData: RegisterDTO = {
      email: 'martinGaido@gmail.com',
      password: 'password123',
      firstName: 'Martin',
      lastName: 'Ga',
    };

    jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword123');
    mockUsersRepository.save.mockRejectedValue(new Error('Save failed'));

    // Act & Assert
    await expect(usersService.register(registerData)).rejects.toThrow(HttpException);
  });
});
