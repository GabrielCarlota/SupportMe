import { Injectable } from '@angular/core';
import {  HttpClientModule  } from '@angular/common/http'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Atendimentos } from './atendimentos.module';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {

  url:string = environment.apiBaseUrl + '/Atendimentos'
  list:Atendimentos[] = [ ]
  formData : Atendimentos = new Atendimentos()
  constructor(private http : HttpClient) { }
  refreshList(){
    this.http.get(this.url).subscribe({next:res=>{this.list = res as Atendimentos[]},error: err =>{console.log(err)} })
  }
  
  postAtendimentos(){
  return this.http.post(this.url,this.formData)
  }

}
