import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeoResponse } from '../../interfaces/GeoResponse';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  url = 'https://geocoder.api.here.com/6.2/geocode.json';
  app_id= 'Rc0JtGUF2icpkUQD1TXn';
  app_code = '7PTxOOWuj4f-qDNtSJdWzQ';
  gen = '8';
  constructor(private http: HttpClient) { }

  getLocation(searchtext: string): Observable<GeoResponse> {
    return this.http.get<any>(`${this.url}?searchtext=${searchtext}&app_id=${this.app_id}&app_code=${this.app_code}&gen=${this.gen}`);
  }
}
