export class RegistrarTipoServicioDTO {
    nombre: string;
    descripcion?: string | null;
    precio: number;
    duracion: number;

    constructor(nombre: string, descripcion: string | null, precio: number, duracion: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.duracion = duracion;
        this.descripcion = descripcion;
    }

}
