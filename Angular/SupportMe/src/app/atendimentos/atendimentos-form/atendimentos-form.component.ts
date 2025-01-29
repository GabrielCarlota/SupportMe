import { Component } from '@angular/core';
import { AtendimentosService } from 'src/app/shared/atendimentos.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-atendimentos-form',
  templateUrl: './atendimentos-form.component.html',
  styles: [
  ]
})
export class AtendimentosFormComponent {

    constructor(public service : AtendimentosService){
  
    }

    onSubmit(form:NgForm){
      this.service.postAtendimentos().subscribe({next:res=>{console.log(res)}, error:err=>{console.log(err)}})
    }
}
