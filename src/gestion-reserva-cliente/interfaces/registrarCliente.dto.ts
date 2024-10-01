export class RegistrarClienteDTO {
    nombre: string;
    apellido: string;
    email: string | null;
    fechaNacimiento?: string | null;
    genero: string;
    contrasena: string;
    telefono: string;

    constructor(nombre: string, apellido: string, email: string | null, telefono: string, fechaNacimiento: string, genero: string, contrasena: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.contrasena = contrasena;
        this.telefono = telefono;
    }

}
