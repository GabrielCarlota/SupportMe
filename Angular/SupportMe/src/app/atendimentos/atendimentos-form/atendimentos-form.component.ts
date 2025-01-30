import { Component } from '@angular/core';
import { AtendimentosService } from 'src/app/shared/atendimentos.service';
import { NgForm } from '@angular/forms'
import { Atendimentos } from 'src/app/shared/atendimentos.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-atendimentos-form',
  templateUrl: './atendimentos-form.component.html',
  styles: [
  ]
})
export class AtendimentosFormComponent {

  constructor(public service: AtendimentosService, private toastr: ToastrService) {

  }

  onSubmit(form: NgForm) {
    if (this.service.formData.atendimento_Id == 0)
      this.insertAtendimento(form)
    else
      this.updateAtendimento(form)
  }

  insertAtendimento(form: NgForm) {
    this.service.postAtendimentos().subscribe({
      next: res => {
        this.service.list = res as Atendimentos[],
          this.service.resetForm(form),
          this.toastr.success('Inserido com sucesso', 'Atendimento registrado')
      },
      error: err => {
        console.log(err)
        this.toastr.error('Um erro ocorreu ao inserir o Atendimento.', 'Erro')
      }
    })
  }
  updateAtendimento(form: NgForm) {
    this.service.putAtendimentos().subscribe({
      next: res => {
        this.service.list = res as Atendimentos[],
          this.service.resetForm(form),
          this.toastr.info('Atualizado com sucesso', 'Atualização')
      },
      error: err => {
        console.log(err)
        this.toastr.error('Um erro ocorreu ao inserir o Atendimento.', 'Erro')
      }
    })
  }
}
