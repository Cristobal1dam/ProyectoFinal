export class EmpresaDto{

    nombre: String;
    direccion: String;
    loc: String;

    constructor(nombre: string, direccion: String, loc: String) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.loc = loc;
    }
}