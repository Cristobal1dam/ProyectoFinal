import { TutorResponse } from "./TutorResponse.interface";


export interface OneAlumnoResponse {
    id: String,
    nombre:String,
    email:string,
    telefono: String,
    tutor:TutorResponse,
    visita:string[]
   }