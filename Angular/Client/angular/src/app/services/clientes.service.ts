import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from '../types/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl = 'http://localhost:5271/api/Clientes';

  constructor(private http: HttpClient) { }

  getUsers=():Observable<Clientes[]>=>
    this.http.get<Clientes[]>
  (`${this.apiUrl}/GetEmpresas`)

  }


