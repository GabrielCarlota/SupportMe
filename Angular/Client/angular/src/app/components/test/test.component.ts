import { Atendimentos } from './../../types/atendimentos';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AtendimentosService } from '../../services/atendimentos.service';
import { Config } from 'datatables.net';
import { Observable, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Atendente } from '../../types/users';

@Component({
  selector: 'app-test',
  imports: [CommonModule, DataTablesModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  constructor(private servico: AtendimentosService, private http: HttpClient) {}

  atendimentosList!: Atendimentos[];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  DateNow: Date = new Date();
  usuarios!: Observable<Atendente[]>;

  AtendimentoObj: any = {
    atendimento_Id: 0,
    problemaApresentado: '',
    resolucaoDoProblema: '',
    cliente_Atendido: '',
    data_Atendimento: '',
    data_Inclusao: this.DateNow,
    empresaId: '',
    atendenteId: '',
  };

  loadTable(){
    this.servico.getAtendimentos().subscribe(item => {
      this.atendimentosList = item;
    })
  }

  ngOnInit(): void {
  }

  /*
  AddAtendimentos(){
    this.servico
    .AddAtendimentos(this.AtendimentoObj)
    .subscribe(Atendimento => this.AddAtendimentos.push(Atendimento));
  }
*/
  onSave() {
    console.log(this.AtendimentoObj);
    this.servico.AddAtendimentos(this.AtendimentoObj).subscribe({
      next: (novoAtendimento) => {
        console.log('Atendimento salvo:', novoAtendimento);
        this.atendimentosList.push(novoAtendimento);
      },
      error: (err) => {
        console.error('Erro ao salvar atendimento:', err);
      },
    });
  }
  onCancel() {}

  loadAtendimentos() {
    this.servico.loadAtt().subscribe((item) => {
      this.atendimentosList = item;
      this.dtTrigger.next(null);
    });
  }
}
