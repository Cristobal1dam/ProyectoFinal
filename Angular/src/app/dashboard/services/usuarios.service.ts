import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ListApiResponse } from 'src/app/interfaces/List-api-response.interface';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/dto/UserDto.dto';
import { UsuarioResponse } from 'src/app/interfaces/UsuarioResponse.interface';
import { AlumnoListResponse } from 'src/app/interfaces/AlumnoListResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}users`, requestOptions);
  }

  create(user : UserDto): Observable<UsuarioResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    user.access_token = 'q1VWdW06rgwqIicOKnebJeAjRZX3nEll'
  
    return this.http.post<UsuarioResponse>(`${environment.ApiUrl}users`,user, requestOptions);
  }

  delete(id): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${environment.ApiUrl}users/${id}`, requestOptions);
  }

  getAlumnoList(id): Observable<AlumnoListResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.get<AlumnoListResponse>(`${environment.ApiUrl}users/${id}`, requestOptions);
  }


}
