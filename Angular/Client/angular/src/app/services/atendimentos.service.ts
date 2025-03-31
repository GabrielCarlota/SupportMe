import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atendimentos } from '../types/atendimentos';
import { Observable } from 'rxjs';
import { Atendente } from '../types/users';
import { error } from 'jquery';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {

  private readonly apiUrl = "http://localhost:5271/api/Atendimentos";

  constructor(private http: HttpClient) {  }

  loadAtt(){
    return this.http.get<Atendimentos[]>(this.apiUrl)
  }

AddAtendimentos(atendimento: Atendimentos): Observable<Atendimentos> {
  return this.http.post<Atendimentos>(this.apiUrl, atendimento)
    .pipe(
      catchError((err: any) =>{
        console.error("erro ao incluir o lançamento", err);
        return throwError(() => new Error(err.message || "Erro fatal, favor reiniciar a aplicação"))
      })
    );
}

  getAtendimentos=():Observable<Atendimentos[]>=> this.http.get<Atendimentos[]>(this.apiUrl)
}
