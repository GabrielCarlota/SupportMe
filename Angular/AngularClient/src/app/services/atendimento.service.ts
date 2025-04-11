import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimentos } from '../interfaces/atendimentos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  apiUrl = 'http://localhost:5271/api/Atendimentos';

  constructor(private http: HttpClient) {}

  getAtendimentos = (): Observable<Atendimentos[]> =>
    this.http.get<Atendimentos[]>(`${this.apiUrl}/AtendimentosFullData`);

    postAtendimentos=(data:Atendimentos)=>{
      return this.http.post(`${this.apiUrl}`, data)
    }

    deleteAtendimentos(id:number):Observable<any>{
      return this.http.delete(`${this.apiUrl}/${id}`)
    }

    putAtendimentos(id:number, atendimentos:Atendimentos):Observable<any>{
      return this.http.put(`${this.apiUrl}/${id}`, atendimentos)
    }
}
