import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL} from '../ServicioApi/apiConfig';
import { BehaviorSubject } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {
  }

  post(resource: string, data: any): Observable<any>{
    return this.http.post(`${API_URL}${resource}`, data);
  }

  get(resource: string, data?: any): Observable<any>{
    return this.http.get(`${API_URL}${resource}`, data);
  }

  put(resource: string, data: FormData): Observable<any> {
    return this.http.put(`${API_URL}${resource}`, data);
  }

}