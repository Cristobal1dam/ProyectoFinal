import { EmpresaResponse } from "./EmpresaResponse.interface";

export interface TutorResponse{
id: String,
nombre: String,
email: String,
telefono: Number,
empresa: EmpresaResponse
}