import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiUrl = 'http://localhost:5271/api/Clientes';

  constructor(private http: HttpClient) { }

  getClientes=():Observable<Clientes[]>=>this.http.get<Clientes[]>(`${this.apiUrl}`);

  postCliente=(data:Clientes)=>{
    return this.http.post(`${this.apiUrl}`, data)
  }

  deleteCliente(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  putCliente(id:number, cliente:Clientes):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, cliente)
  }
}
