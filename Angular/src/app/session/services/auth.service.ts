import { Injectable } from '@angular/core';
import { LoginDto } from 'src/app/dto/LoginDto.dto';
import { LoginResponse } from 'src/app/interfaces/Login-response.interface';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + btoa(`${loginDto.email}:${loginDto.password}`),
        'Access-Control-Allow-Origin': '*'
      })
    };
    class Metakey {
      access_token: String;

      constructor(access_token: String) {
        this.access_token = access_token;
      }
    }
    const metaKey = new Metakey('q1VWdW06rgwqIicOKnebJeAjRZX3nEll');
    return this.http.post<LoginResponse>(`${environment.ApiUrl}auth`, metaKey, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('id', loginResponse.user.id);
    localStorage.setItem('name', loginResponse.user.name);
    localStorage.setItem('email', loginResponse.user.email);
    localStorage.setItem('role', loginResponse.user.role);
  }

}


