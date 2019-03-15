import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlumnoDto } from 'src/app/dto/AlumnoDto.dto';
import { AlumnoResponse } from 'src/app/interfaces/AlumnoResponse.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }




  create(id, alumno : AlumnoDto): Observable<AlumnoResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.post<AlumnoResponse>(`${environment.ApiUrl}alumnos/${id}`,alumno, requestOptions);
  }

  delete(id): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${environment.ApiUrl}alumnos/${id}`, requestOptions);
  }
}
