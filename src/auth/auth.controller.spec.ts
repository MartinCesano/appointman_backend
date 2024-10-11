import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDTO } from './interfaces/login.dto';
import { HttpException } from '@nestjs/common';
import { RegistrarUsuarioDTO } from './interfaces/registrarUsuario.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    validateToken: jest.fn(),
    refreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('debería devolver los datos del usuario cuando el inicio de sesión es exitoso', async () => {
      const loginDto: LoginDTO = { email: 'test@example.com', contrasena: 'password' };
      const result = { accessToken: 'someAccessToken' };
      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });

    it('debería lanzar un error si el inicio de sesión falla', async () => {
      const loginDto: LoginDTO = { email: 'wrong@example.com', contrasena: 'wrongPassword' };
      mockAuthService.login.mockRejectedValue(new HttpException('Credenciales inválidas', 401));

      await expect(authController.login(loginDto)).rejects.toThrow(HttpException);
    });
  });

  describe('register', () => {
    it('debería devolver un mensaje de éxito cuando el registro es exitoso', async () => {
      const registerDto: RegistrarUsuarioDTO = { 
        email: 'newuser@example.com', 
        contrasena: 'newPassword',
        nombre: 'New',
        apellido: 'User',
        telefono: '1234567890'
      };
      const result = { message: 'Usuario registrado exitosamente' };
      mockAuthService.register.mockResolvedValue(result);

      expect(await authController.register(registerDto)).toEqual(result);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });

    it('debería lanzar un error si el registro falla', async () => {
      const registerDto: RegisterDTO = { 
        email: 'existinguser@example.com', 
        contrasena: 'password',
        nombre: 'Existing',
        apellido: 'User',
        telefono: '0987654321'
      };
      mockAuthService.register.mockRejectedValue(new HttpException('El usuario ya existe', 409));

      await expect(authController.register(registerDto)).rejects.toThrow(HttpException);
    });
  });

  describe('validateToken', () => {
    it('debería devolver verdadero si el token es válido', async () => {
      const token = 'validToken';
      mockAuthService.validateToken.mockResolvedValue(true);

      expect(await authController.validateToken({ token })).toEqual({ valid: true });
      expect(mockAuthService.validateToken).toHaveBeenCalledWith(token);
    });

    it('debería lanzar un error si el token es inválido', async () => {
      const token = 'invalidToken';
      mockAuthService.validateToken.mockResolvedValue(false);

      await expect(authController.validateToken({ token })).rejects.toThrow(HttpException);
      expect(mockAuthService.validateToken).toHaveBeenCalledWith(token);
    });
  });

  describe('refreshToken', () => {
    it('debería devolver un nuevo token de acceso cuando el token de refresco es válido', async () => {
      const refreshToken = 'validRefreshToken';
      const result = { accessToken: 'newAccessToken' };
      mockAuthService.refreshToken.mockResolvedValue(result);

      expect(await authController.refreshToken({ refreshToken })).toEqual(result);
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(refreshToken);
    });

    it('debería lanzar un error si el token de refresco es inválido', async () => {
      const refreshToken = 'invalidRefreshToken';
      mockAuthService.refreshToken.mockRejectedValue(new HttpException('Token de refresco inválido', 401));

      await expect(authController.refreshToken({ refreshToken })).rejects.toThrow(HttpException);
    });
  });
});
