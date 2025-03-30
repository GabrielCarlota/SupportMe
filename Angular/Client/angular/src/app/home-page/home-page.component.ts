import { Atendimentos } from './../types/atendimentos';
import { Component, inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Atendente } from '../types/users';
import { AtendimentosService } from '../services/atendimentos.service';
import { HttpClient } from '@angular/common/http';
import 'datatables.net';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables'

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  users!:Observable<Atendente[]>
  UserHttp = inject (UsersService);
  servico = inject (AtendimentosService);

  AtendimentosList!: Atendimentos[]
  dados: Atendimentos[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any[]>

  constructor(private toast:ToastrService, private http: HttpClient){}

  ShowSuccees(){
    this.toast.success('Saved', 'Salvo com sucesso', {closeButton:true})
  }

  ngOnInit(){


    this.dtOptions = {
         pagingType: 'full_numbers',
         pageLength: 10,
         processing: true,
         scrollX: true,
       };

    this.servico.getAtendimentos().
    subscribe({
      next:(res)=>{
        this.dados = res;
        console.log("Os dados são: ",res);
        this.dtTrigger.next(null)
      },
      error:(err) => {
        console.log(err?.err.error);

      },
    })
  }

  loadTable(){
    this.servico.getAtendimentos().subscribe(item => {
      this.AtendimentosList = item;
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
