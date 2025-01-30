import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Atendimentos } from './atendimentos.module';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AtendimentosService {

  url: string = environment.apiBaseUrl + '/Atendimentos'
  list: Atendimentos[] = []
  formData: Atendimentos = new Atendimentos()
  constructor(private http: HttpClient) { }
  refreshList() {
    this.http.get(this.url).subscribe({ next: res => { this.list = res as Atendimentos[] }, error: err => { console.log(err) } })
  }

  getAtendimentos(){
    this.http.get(this.url)
  }

  postAtendimentos() {
    return this.http.post(this.url, this.formData)
  }
  putAtendimentos() {
    return this.http.put(this.url + '/' + this.formData.atendimento_Id, this.formData)
  }
  deleteAtendimento(id:number){
    return this.http.delete(this.url + '/' + id)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new Atendimentos()
  }


}
