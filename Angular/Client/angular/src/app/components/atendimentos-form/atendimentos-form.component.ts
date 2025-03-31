import { Component } from '@angular/core';
import { Atendimentos } from '../../types/atendimentos';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { AtendimentosService } from '../../services/atendimentos.service';

@Component({
  selector: 'app-atendimentos-form',
  imports: [],
  templateUrl: './atendimentos-form.component.html',
  styleUrl: './atendimentos-form.component.css'
})
export class AtendimentosFormComponent {

  constructor(private servico: AtendimentosService){}

    atendimentosList!: Atendimentos[];
    dtOptions: Config = {};
    dtTrigger: Subject<any> = new Subject<any>();
    DateNow: Date = new Date();

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

}
