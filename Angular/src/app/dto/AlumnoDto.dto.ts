export class AlumnoDto{

    nombre: String
    email: string
    telefono: number
    tutor: string

    constructor(nombre: String, email: string, telefono: number,tutor: string){
        
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.tutor = tutor;
       
    }
}