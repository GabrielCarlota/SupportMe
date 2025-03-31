import { error } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Atendente } from '../../types/users';
import { AtendimentosService } from '../../services/atendimentos.service';
import { HttpClient } from '@angular/common/http';
import 'datatables.net';
import { CommonModule } from '@angular/common';
import {DataTablesModule} from 'angular-datatables'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-clientes-form',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit{

  constructor(private servico: ClientesService){}

  dados: any[] = []
  dtOptions: any ={}
  dtTrigger: Subject<any> = new Subject<any[]>

  ngOnInit(){

    this.servico.getUsers().
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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      scrollX: true,
      info: true,
      scrollY: "400px",
      scrollCollapse: false,
      fixedHeader: true,
      language: {
        search: "Pesquisa:"
      },
      dom: "<'top mb-4'lf>rtip"
    }
  }

  OnRowDoubleClick(item: any){
    console.log('linha clicada', item);

  }
}
