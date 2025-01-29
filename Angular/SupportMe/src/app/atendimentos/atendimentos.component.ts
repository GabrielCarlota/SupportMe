import { Component, OnInit } from '@angular/core';
import { AtendimentosService } from '../shared/atendimentos.service';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styles: [
  ]
})
export class AtendimentosComponent implements OnInit {

  
  constructor(public service : AtendimentosService){

  }
  ngOnInit(): void {
    this.service.refreshList();
  }
}
