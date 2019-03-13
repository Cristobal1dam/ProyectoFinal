import { Injectable } from '@angular/core';
import { ListApiResponse } from 'src/app/interfaces/List-api-response.interface';
import { EmpresaResponse } from 'src/app/interfaces/EmpresaResponse.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EmpresaDto } from 'src/app/dto/EmpresaDto.dto';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}empresas`, requestOptions);
  }

  create(empresa : EmpresaDto): Observable<EmpresaResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.post<EmpresaResponse>(`${environment.ApiUrl}empresas`,empresa, requestOptions);
  }

  delete(id): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${environment.ApiUrl}empresas/${id}`, requestOptions);
  }
}
