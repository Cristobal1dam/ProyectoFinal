export class TutorDto{

    nombre: String
    email: String
    telefono: Number
    empresa: String

    constructor(nombre: String, email: String, telefono: Number, empresa: String){
        
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.empresa = empresa;
    }
}