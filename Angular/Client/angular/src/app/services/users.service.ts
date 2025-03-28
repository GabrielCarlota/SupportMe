import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendente } from '../types/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = 'http://localhost:5271/api/Atendente';

  constructor(private http: HttpClient) { }

  getUsers=():Observable<Atendente[]>=> this.http.get<Atendente[]>(this.apiUrl)

  login = (data: Atendente) => {
    console.log("Login data: ", data);
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  addUser = (data: Atendente) => {
    console.log("Add User data: ", data);
    return this.http.post(`${this.apiUrl}/Registro`, data);
  };

}
