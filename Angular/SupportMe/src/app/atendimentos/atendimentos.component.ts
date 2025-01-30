import { Component, OnInit, OnChanges } from '@angular/core';
import { AtendimentosService } from '../shared/atendimentos.service';
import { Atendimentos } from '../shared/atendimentos.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styles: [
  ]
})
export class AtendimentosComponent implements OnInit {


  constructor(public service : AtendimentosService, private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedAtend:Atendimentos){
    this.service.formData = Object.assign({}, selectedAtend);
  }

  DeleteAtend(id:number){
    if(confirm('Você realmente deseja deletar o atendimento?'))
    this.service.deleteAtendimento(id)
    .subscribe({
      next: res => {
        this.service.list = res as Atendimentos[]
        this.toastr.show('Atendimento deletado com sucesso', 'Deletado')
      }
    })
  }

}
