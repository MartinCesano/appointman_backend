import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { HttpException } from '@nestjs/common';

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
    it('should return user data when login is successful', async () => {
      const loginDto: LoginDTO = { email: 'test@example.com', password: 'password' };
      const result = { accessToken: 'someAccessToken' };
      mockAuthService.login.mockResolvedValue(result);

      expect(await authController.login(loginDto)).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw an error if login fails', async () => {
      const loginDto: LoginDTO = { email: 'wrong@example.com', password: 'wrongPassword' };
      mockAuthService.login.mockRejectedValue(new HttpException('Invalid credentials', 401));

      await expect(authController.login(loginDto)).rejects.toThrow(HttpException);
    });
  });

  describe('register', () => {
    it('should return success message when registration is successful', async () => {
      const registerDto: RegisterDTO = { 
        email: 'newuser@example.com', 
        contrasena: 'newPassword',
        nombre: 'New',
        apellido: 'User',
        telefono: '1234567890'
      };
      const result = { message: 'User registered successfully' };
      mockAuthService.register.mockResolvedValue(result);

      expect(await authController.register(registerDto)).toEqual(result);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should throw an error if registration fails', async () => {
      const registerDto: RegisterDTO = { 
        email: 'existinguser@example.com', 
        contrasena: 'password',
        nombre: 'Existing',
        apellido: 'User',
        telefono: '0987654321'
      };
      mockAuthService.register.mockRejectedValue(new HttpException('User already exists', 409));

      await expect(authController.register(registerDto)).rejects.toThrow(HttpException);
    });
  });

  describe('validateToken', () => {
    it('should return valid true if token is valid', async () => {
      const token = 'validToken';
      mockAuthService.validateToken.mockResolvedValue(true);

      expect(await authController.validateToken({ token })).toEqual({ valid: true });
      expect(mockAuthService.validateToken).toHaveBeenCalledWith(token);
    });

    it('should throw an error if token is invalid', async () => {
      const token = 'invalidToken';
      mockAuthService.validateToken.mockResolvedValue(false);

      await expect(authController.validateToken({ token })).rejects.toThrow(HttpException);
      expect(mockAuthService.validateToken).toHaveBeenCalledWith(token);
    });
  });

  describe('refreshToken', () => {
    it('should return new access token when refresh token is valid', async () => {
      const refreshToken = 'validRefreshToken';
      const result = { accessToken: 'newAccessToken' };
      mockAuthService.refreshToken.mockResolvedValue(result);

      expect(await authController.refreshToken({ refreshToken })).toEqual(result);
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(refreshToken);
    });

    it('should throw an error if refresh token is invalid', async () => {
      const refreshToken = 'invalidRefreshToken';
      mockAuthService.refreshToken.mockRejectedValue(new HttpException('Invalid refresh token', 401));

      await expect(authController.refreshToken({ refreshToken })).rejects.toThrow(HttpException);
    });
  });
});
