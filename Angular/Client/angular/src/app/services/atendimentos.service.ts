import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimentos } from '../types/atendimentos';
import { Observable } from 'rxjs';
import { Atendente } from '../types/users';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {

  private readonly apiUrl = "http://localhost:5271/api/Atendimentos";

  constructor(private http: HttpClient) {  }

  loadAtt(){
    return this.http.get<Atendimentos[]>(this.apiUrl)
  }

  getAtendimentos=():Observable<Atendimentos[]>=> this.http.get<Atendimentos[]>(this.apiUrl)
}
