import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url = 'users/';

  constructor(private http:HttpClient) {}

  login(data:any): Observable<any> {
    return this.http.post<User>(this._url+"login/", data);
  }

  
  getUserDetails(params:HttpParams): Observable<any> {
    return this.http.get<any>(this._url+"byid", {params: params });
  }

}
