import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListApiResponse } from 'src/app/interfaces/List-api-response.interface';
import { environment } from 'src/environments/environment';
import { TutorDto } from 'src/app/dto/TutorDto.dto';
import { TutorResponse } from 'src/app/interfaces/TutorResponse.interface';
import { TutorDispResponse } from 'src/app/interfaces/TutorDispResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.get<ListApiResponse>(`${environment.ApiUrl}tutors`, requestOptions);
  }

  create(tutor : TutorDto): Observable<TutorResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.post<TutorResponse>(`${environment.ApiUrl}tutors`,tutor, requestOptions);
  }

  delete(id): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${environment.ApiUrl}tutors/${id}`, requestOptions);
  }

  getAllDisp(): Observable<TutorDispResponse[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.get<TutorDispResponse[]>(`${environment.ApiUrl}tutors/disp`, requestOptions);
  }

  edit(id, tutor : TutorDto): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
  
    return this.http.put<any>(`${environment.ApiUrl}tutors/${id}`,tutor, requestOptions);
  }
}
