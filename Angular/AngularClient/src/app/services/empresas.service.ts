import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  apiUrl = 'http://localhost:5271/api/Empresa';

  constructor(private http: HttpClient) {}

  getEmpresas = (): Observable<Empresa[]> =>
    this.http.get<Empresa[]>(`${this.apiUrl}`);

    postEmpresa=(data:Empresa)=>{
      return this.http.post(`${this.apiUrl}`, data)
    }

    deleteEmpresa(id:number):Observable<any>{
      return this.http.delete(`${this.apiUrl}/${id}`)
    }

    putEmpresa(id:number, empresa:Empresa):Observable<any>{
      return this.http.put(`${this.apiUrl}/${id}`, empresa)
    }
}
