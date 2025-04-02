import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atendente } from '../interfaces/atendente';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  apiUrl = 'http://localhost:5271/api/Atendente'

  constructor(private http: HttpClient) { }

  getAtendentes=():Observable<Atendente[]>=>
    this.http.get<Atendente[]>
  (`${this.apiUrl}`)

  loginAtendentes=( data: Atendente)=>{
      console.log("Login data", data);
      return this.http.post(`${this.apiUrl}/Login`, data)
  }

  registroAtendentes=(data:Atendente)=>{
    console.log("Registro data", data);
    return this.http.post(`${this.apiUrl}/Registro`, data)

  }


}
