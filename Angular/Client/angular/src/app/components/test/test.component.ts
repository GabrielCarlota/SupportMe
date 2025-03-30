import { Atendimentos } from './../../types/atendimentos';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AtendimentosService } from '../../services/atendimentos.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-test',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  constructor(private servico: AtendimentosService){}

  atendimentosList!:Atendimentos[]
  dtOptions:Config={}
  dtTrigger:Subject<any> = new Subject<any>();



  ngOnInit(): void{
    this.loadAtendimentos();
    this.dtOptions={
      pagingType:'full'
    }
  }

  loadAtendimentos(){
    this.servico.loadAtt().subscribe(item =>{
      this.atendimentosList = item;
      this.dtTrigger.next(null);
    })
  }
}
