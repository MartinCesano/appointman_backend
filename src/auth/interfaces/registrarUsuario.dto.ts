import { IsEmail, IsNotEmpty, MinLength, IsString, IsPhoneNumber } from 'class-validator';
import { RegistrarClienteDTO } from './registrarCliente.dto';
import { RegistrarEmpleadoDTO } from './registrarEmpleado.dto';
import { RegistrarEmprendedorDTO } from './registrarEmprendedor.dto';

export class RegistrarUsuarioDTO {
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

    roles:string[];

    cliente?: RegistrarClienteDTO

    empleado?: RegistrarEmpleadoDTO

    emprendedor?: RegistrarEmprendedorDTO
}
