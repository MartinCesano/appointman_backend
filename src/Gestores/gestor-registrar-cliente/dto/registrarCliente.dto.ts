export class RegistrarTipoServicioDTO {
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    fechaNacimiento?: string | null;
    genero: string;
    contraseña: string;
    documento?: number | null;

    constructor(nombre: string, apellido: string, email: string, telefono: number, fechaNacimiento: string, genero: string, documento: number | null, contraseña: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.documento = documento;
        this.contraseña = contraseña;
    }

}
