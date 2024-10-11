import { IsEmail, IsNotEmpty, MinLength, IsString, IsPhoneNumber } from 'class-validator';

export class RegistrarEmpleadoDTO {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  contrasena: string; 

  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  nombre: string; 

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  apellido: string; 

  @IsNotEmpty({ message: 'Phone number is required' })
  telefono: string;

  rol:string[];
}